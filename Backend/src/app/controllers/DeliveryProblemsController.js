import * as Yup from 'yup';

import Deliveries from '../models/Deliveries';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Recipients from '../models/Recipients';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class ProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const deliveryPromblens = await DeliveryProblem.findAll({
      where: { deleted_at: null },
      include: [
        {
          model: Deliveries,
          as: 'delivery',
          attributes: ['id', 'product'],
          where: { deleted_at: null },
          include: [
            {
              model: Recipients,
              as: 'recipient',
              attributes: ['name', 'street', 'number', 'city', 'zip_code'],
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      attributes: ['id', 'description'],
      order: [['created_at', 'DESC']],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(deliveryPromblens);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryPromblem = await DeliveryProblem.findAll({
      where: { delivery_id: id, deleted_at: null },
      include: [
        {
          model: Deliveries,
          as: 'delivery',
          attributes: ['id', 'product'],
          include: [
            {
              model: Recipients,
              as: 'recipient',
              attributes: ['name', 'street', 'number', 'city', 'zip_code'],
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      attributes: ['id', 'description', 'created_at'],
    });

    if (!deliveryPromblem)
      return res.status(400).json({ error: 'Problem not found' });

    return res.json(deliveryPromblem);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    const schema = Yup.object().shape({
      description: Yup.string().required('Desciption is required'),
      delivery_id: Yup.number().required('Invalid delivery'),
    });

    await schema.validate({
      description,
      delivery_id: id,
    });

    // Verificando se Delivery existe
    const delivery = await Deliveries.findByPk(id);

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery not exists.' });
    }

    // Verificando se Delivery foi cancelada
    if (delivery.canceled_at !== null) {
      return res.status(401).json({ error: 'Delivery is canceled.' });
    }

    // Verificando se Produto foi entregue
    if (delivery.end_date !== null) {
      return res.status(401).json({ error: 'Produto is already delivered.' });
    }

    // Verificando se Produto saiu pra entrega
    if (delivery.start_date === null) {
      return res
        .status(401)
        .json({ error: 'This delivery has not been withdrawn.' });
    }

    const problem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    // Verificando se problema existe
    if (!problem) {
      return res.status(401).json({ error: 'Problem does not exists ' });
    }

    const delivery = await Deliveries.findByPk(problem.delivery_id, {
      where: {
        deleted_at: null,
      },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipients,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'city', 'zip_code'],
        },
      ],
    });

    // Verificando se Delivery existe
    if (!delivery) {
      return res.status(401).json({ error: 'Delivery not exists.' });
    }

    // Verificando se Produto foi entregue
    if (delivery.end_date !== null) {
      return res
        .status(401)
        .json({ error: 'The product has already been delivered.' });
    }

    // Verificando se Delivery foi cancelada
    if (delivery.canceled_at !== null) {
      return res
        .status(401)
        .json({ error: 'The product has already been canceled.' });
    }

    delivery.canceled_at = new Date();
    problem.deleted_at = new Date();

    await delivery.update({ status: 'CANCELADO' });

    await delivery.save();
    await problem.save();

    await Queue.add(CancellationMail.key, {
      product: delivery.product,
      recipient: delivery.recipient,
      deliveryman: delivery.deliveryman,
    });

    return res.json(problem);
  }
}

export default new ProblemsController();
