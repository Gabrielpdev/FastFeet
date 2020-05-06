import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';
import { Form, Input  } from '@rocketseat/unform';

import AvatarInput from '../AvatarInput';

import history from '~/services/history';
import api from '~/services/api';

import { Container, DeliverymanForm, Loading } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Este campo é obrigatório'),
  email: Yup.string().required('Este campo é obrigatório'),
});

export default function Deliveryman({ match }) {
  const { id } = match.params;

  const [deliveryman, setDeliveryman] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        if (id) {
          const { data } = await api.get(`deliveryman/${id}`);
          setDeliveryman(data);
        }
      } catch (err) {
        toast.error('Falha ao carregar os dados');
      }
    }

    loadData();
  }, [id]);

  async function SubmitDeliveryman(data) {
    if (id) {
      try {
        const response = await api.put(`deliveryman/${id}`, data);
        if (response) {
          toast.success('Entregador editado com sucesso!');
          history.push('/deliveryman');
        }
      } catch (err) {
        toast.error('Email já está cadastrado');
      }
    } else {
      try {
        await api.post('deliveryman', data);
        toast.success('Entregador cadastrado com sucesso!');
        history.push('/deliveryman');
      } catch (err) {
        toast.error('Email já está cadastrado');
      }
    }
  }

  if (id && !deliveryman) {
    return (
      <Loading>
        <AiOutlineLoading />
      </Loading>
    );
  }
  return (
    <Container>
      <Form
        schema={schema}
        onSubmit={SubmitDeliveryman}
        initialData={deliveryman || undefined}
      >
        <div>
          <strong>
            {deliveryman ? 'Editar entregadores' : 'Cadastrar entregadores'}
          </strong>
          <div>
            <button type="button" onClick={() => history.push('/deliveryman')}>
              <MdArrowBack size={20} color="#fff" />
              VOLTAR
            </button>
            <button type="submit">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </button>
          </div>
        </div>

        <DeliverymanForm>
          <AvatarInput name="avatar_id" />

          <strong>Nome</strong>
          <Input
            name="name"
            placeholder={deliveryman ? deliveryman.name : 'Ex: Fulano de Tal'}
          />
          <strong>Email</strong>
          <Input
            name="email"
            placeholder={
              deliveryman ? deliveryman.email : 'Ex: entragador@email.com'
            }
          />
        </DeliverymanForm>
      </Form>
    </Container>
  );
}

Deliveryman.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
