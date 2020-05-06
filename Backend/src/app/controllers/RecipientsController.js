import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipients';

class RecipientsController {
  async index(req, res) {
    const { page = 1, name } = req.query;

    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
        deleted_at: null,
      },
      order: [['id', 'DESC']],
      limit: 5,
      offset: (page - 1) * 5,
    });
    return res.json(recipients);
  }

  async show(req, res) {
    const { name } = req.query;
    const recipients = await Recipient.findByPk(req.params.id, {
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
        deleted_at: null,
      },
    });
    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .min(8)
        .max(9)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
      deleted_at,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
      deleted_at,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .min(9)
        .max(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipientId = await Recipient.findByPk(id);

    if (!recipientId) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await recipientId.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async delete(req, res) {
    // Verificar se Recipient existe
    const { id } = req.params;
    const recipient = await Recipient.findOne({ where: { id } });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    // Verificar se Recipient já foi apagado
    if (recipient.deleted_at !== null) {
      return res.status(401).json({ error: 'Recipient is already deleted' });
    }

    recipient.deleted_at = new Date();

    await recipient.save();

    return res.json(recipient);
  }
}

export default new RecipientsController();
