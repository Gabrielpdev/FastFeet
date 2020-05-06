import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, name } = req.query;

    const deliveryman = await Deliveryman.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
        deleted_at: null,
      },
      attributes: ['id', 'name', 'email'],
      order: [['id', 'DESC']],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveryman);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findOne({
      where: {
        id,
        deleted_at: null,
      },
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    // Verificar se email já existe
    const verifyEmail = await Deliveryman.findOne({
      where: { email: req.body.email, deleted_at: null },
    });

    if (verifyEmail) {
      return res.status(401).json({ error: 'This email is already used' });
    }

    // Criando Deliveryman
    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    // Verificar se Deliveryman existe
    const { id } = req.params;
    const deliveryman = await Deliveryman.findOne({
      where: { id, deleted_at: null },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    // Verificar se email já existe
    if (req.body.email !== deliveryman.email) {
      const verifyEmail = await Deliveryman.findOne({
        where: { email: req.body.email },
      });
      if (verifyEmail) {
        return res.status(400).json({ error: 'This email is already used' });
      }
    }

    const { name, email, avatar } = await deliveryman.update(req.body);

    return res.json({ id, name, email, avatar });
  }

  async delete(req, res) {
    // Verificar se Deliveryman existe
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    // Verificar se Deliveryman já foi apagado
    if (deliveryman.deleted_at !== null) {
      return res.status(401).json({ error: 'Deliveryman is already deleted' });
    }

    deliveryman.deleted_at = new Date();

    await deliveryman.save();

    return res.json(deliveryman);
  }
}

export default new DeliverymanController();
