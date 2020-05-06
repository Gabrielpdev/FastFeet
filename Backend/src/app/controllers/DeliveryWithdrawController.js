import { Op } from 'sequelize';
import { isBefore, isAfter, setHours, format } from 'date-fns';

import Deliveries from '../models/Deliveries';

class DeliveryWithdrawController {
  async update(req, res) {
    // Verificando se Delivery existe
    const delivery = await Deliveries.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    // Verificando se Delivery ja foi cancelado
    if (delivery.canceled_at !== null) {
      return res.status(400).json({ error: 'Delivery has been canceled' });
    }

    // Verificando de o produto ja foi retirado
    const { start_date } = await Deliveries.findByPk(req.params.id);

    if (start_date !== null) {
      return res
        .status(400)
        .json({ error: 'Product has already been withdrawn' });
    }

    // Verificando de o entregador ja fez 5 entregas
    const { count } = await Deliveries.findAndCountAll({
      where: {
        deliveryman_id: delivery.deliveryman_id,
        start_date: { [Op.gte]: format(new Date(), 'yyyy-MM-dd') },
        signature_id: null,
      },
    });

    if (count === 5) {
      return res
        .status(400)
        .json({ error: 'Maximum number of withdrawals reached' });
    }

    // Verificando se o horaio esta entre 08:00 e 18:00
    if (
      isBefore(new Date(), setHours(new Date(), 8)) ||
      isAfter(new Date(), setHours(new Date(), 20))
    ) {
      return res.status(400).json({ error: 'Invalid time' });
    }

    const {
      id,
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
      end_date,
      canceled_at,
    } = await delivery.update({
      status: 'RETIRADO',
      start_date: new Date(),
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
}

export default new DeliveryWithdrawController();
