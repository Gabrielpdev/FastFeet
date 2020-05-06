import { Op } from 'sequelize';

import Deliveries from '../models/Deliveries';
import Recipients from '../models/Recipients';
import Deliveryman from '../models/Deliveryman';

class DeliveryPeddingController {
  async index(req, res) {
    const { page = 1 } = req.query;

    // Verificar se o entregador existe
    const checkDeliveryman = await Deliveryman.findOne({
      where: { id: req.params.id, deleted_at: null },
    });

    if (!checkDeliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    // Listando encomentas para o entregador
    const delivery = await Deliveries.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
      attributes: [
        'id',
        'status',
        'product',
        'start_date',
        'end_date',
        'created_at',
      ],
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
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }
    return res.json(delivery);
  }
}

export default new DeliveryPeddingController();
