import React, { useEffect, useState, useMemo } from 'react';

import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';
import { Form, Input } from '@rocketseat/unform';

import history from '~/services/history';
import api from '~/services/api';

import Select from '~/components/Select';

import { Container, DeliveryForm, Loading } from './styles';

export default function Delivery({ match }) {
  const { id } = match.params;

  const [delivery, setDelivery] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [deliverymanResponse, recipientResponse] = await Promise.all([
          api.get('deliveryman', { params: { name: '' } }),
          api.get('recipients', { params: { name: '' } }),
        ]);

        setDeliverymans(deliverymanResponse.data);
        setRecipients(recipientResponse.data);

        if (id) {
          const { data } = await api.get(`deliveries/${id}`);
          setDelivery(data);
          setSelectedRecipient(data.recipient);
          setSelectedDeliveryman(data.deliveryman);
        }
      } catch (err) {
        toast.error('Falha ao carregar os dados');
      }
    }

    loadData();
  }, [id]);

  const RecipientOptions = useMemo(() => {
    return recipients.map((recipient) => ({
      value: recipient,
      label: recipient.name,
    }));
  }, [recipients]);

  const DeliverymanOptions = useMemo(() => {
    return deliverymans.map((deliverymen) => ({
      value: deliverymen,
      label: deliverymen.name,
    }));
  }, [deliverymans]);

  const handleChangeRecipient = (selectedOption) => {
    const { value } = selectedOption;

    setSelectedRecipient(value);
  };

  const handleChangeDeliveryman = (selectedOption) => {
    const { value } = selectedOption;
    setSelectedDeliveryman(value);
  };

  async function SubmitDelivery(data) {
    if (!selectedRecipient || !selectedDeliveryman || !data.product) {
      toast.error('Dados incompletos');
    } else {
      data.recipient_id = selectedRecipient.id;
      data.deliveryman_id = selectedDeliveryman.id;

      if (id) {
        await api.put(`deliveries/${id}`, data);
        toast.success('Encomenda editada com sucesso!');
        history.push('/deliveries');
      } else {
        await api.post('deliveries', data);
        toast.success('Encomenda cadastrada com sucesso!');
        history.push('/deliveries');
      }
    }
  }

  console.tron.log(delivery);

  if (id && !delivery) {
    return (
      <Loading>
        <AiOutlineLoading />
      </Loading>
    );
  }
  return (
    <Container>
      <Form onSubmit={SubmitDelivery} initialData={delivery || undefined}>
        <div>
          <strong>
            {delivery ? 'Editar encomenda' : 'Cadastrar encomenda'}
          </strong>
          <div>
            <button type="button" onClick={() => history.push('/deliveries')}>
              <MdArrowBack size={20} color="#fff" />
              VOLTAR
            </button>
            <button type="submit">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </button>
          </div>
        </div>

        <DeliveryForm>
          <div>
            <div>
              <strong>Destinatário</strong>
              <div>
                <Select
                  name="selectRecipient"
                  value={selectedRecipient}
                  onChange={handleChangeRecipient}
                  options={RecipientOptions}
                  placeholder="Selecione o destinatário"
                  defaultValue={
                    delivery
                      ? {
                          value: delivery.recipient.id,
                          label: delivery.recipient.name,
                        }
                      : undefined
                  }
                />
              </div>
            </div>
            <div>
              <strong>Entregador</strong>
              <Select
                styles
                value={selectedDeliveryman}
                onChange={handleChangeDeliveryman}
                options={DeliverymanOptions}
                placeholder="Selecione o entregador"
                defaultValue={
                  delivery
                    ? {
                        value: delivery.deliveryman.id,
                        label: delivery.deliveryman.name,
                      }
                    : undefined
                }
              />
            </div>
          </div>
          <strong>Nome do produto</strong>
          <Input
            name="product"
            placeholder={delivery ? delivery.product : 'Ex: Sapato'}
          />
        </DeliveryForm>
      </Form>
    </Container>
  );
}

Delivery.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
