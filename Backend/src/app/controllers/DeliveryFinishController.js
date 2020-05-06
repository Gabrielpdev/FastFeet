import Deliveries from '../models/Deliveries';
import File from '../models/File';

class DeliveryFinishController {
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

    // Verificando de o produto ja foi entregue
    const { end_date } = await Deliveries.findByPk(req.params.id);

    if (end_date !== null) {
      return res
        .status(400)
        .json({ error: 'Product has already been delivered' });
    }

    // Verificando se o produto foi retirado
    const { start_date } = await Deliveries.findByPk(req.params.id);

    if (!start_date) {
      return res.status(400).json({ error: 'Product has not been withdrawn' });
    }

    // Finalizando Entrega
    const signatureImage = await File.findByPk(req.body.signature_id);

    if (!signatureImage) {
      return res.status(400).json({ error: 'Signature image does not exists' });
    }

    await delivery.update({
      end_date: new Date(),
      signature_id: signatureImage.id,
      status: 'ENTREGUE',
    });

    return res.json({
      delivery,
    });
  }
}

export default new DeliveryFinishController();
