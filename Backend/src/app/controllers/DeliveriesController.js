import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipients from '../models/Recipients';
import Deliveries from '../models/Deliveries';

import Queue from '../../lib/Queue';
import AvalibleMail from '../jobs/AvalibleMail';

class DeliveriesController {
  async index(req, res) {
    const { page = 1, product } = req.query;

    const deliveries = await Deliveries.findAll({
      where: {
        product: {
          [Op.iLike]: `${product}%`,
        },
        deleted_at: null,
      },
      order: ['id'],
      attributes: [
        'id',
        'status',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'city',
            'state',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveries);
  }

  async show(req, res) {
    const { page = 1 } = req.query;

    const deliveries = await Deliveries.findOne({
      where: {
        id: req.params.id,
        deleted_at: null,
      },
      order: ['id'],
      attributes: ['id', 'status', 'product', 'start_date', 'end_date'],
      limit: 20,
      offset: (page - 1) * 10,
      include: [
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'city',
            'state',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    // Verificar se Recipient existe
    const recipient = await Recipients.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    // Verificar se o entregador existe
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const {
      id,
      signature_id,
      start_date,
      end_date,
      canceled_at,
    } = await Deliveries.create({
      product,
      recipient_id,
      deliveryman_id,
      status: 'PENDENTE',
    });

    await Queue.add(AvalibleMail.key, {
      product,
      recipient,
      deliveryman,
    });

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
      start_date,
      end_date,
      canceled_at,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    // Verificando se Delivery existe
    const delivery = await Deliveries.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    // Verificar se Recipient existe
    const checkRecipient = await Recipients.findByPk(recipient_id);

    if (!checkRecipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    // Verificar se o entregador existe
    const checkDeliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!checkDeliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const {
      id,
      signature_id,
      start_date,
      end_date,
      canceled_at,
    } = await delivery.update(req.body);

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
      start_date,
      end_date,
      canceled_at,
    });
  }

  async delete(req, res) {
    // Verificar se Deliveryman existe
    const { id } = req.params;
    const delivery = await Deliveries.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    delivery.deleted_at = new Date();

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveriesController();
