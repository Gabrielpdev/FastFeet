import Mail from '../../lib/Mail';

class AvalibleMail {
  get key() {
    return 'AvalibleMail';
  }

  async handle({ data }) {
    const { product, recipient, deliveryman } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Produto Disponível',
      template: 'avalible',
      context: {
        deliveryman: deliveryman.name,
        product,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        city: recipient.city,
        state: recipient.state,
      },
    });
  }
}

export default new AvalibleMail();
