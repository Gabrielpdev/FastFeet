import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';

import history from '~/services/history';
import api from '~/services/api';

import { Container, RecipientForm, Loading } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Este campo é obrigatório'),
  street: Yup.string().required('Este campo é obrigatório'),
  number: Yup.number('Somente numeros')
    .typeError('Este campo é obrigatório')
    .required('Este campo é obrigatório'),
  complement: Yup.string(),
  city: Yup.string().required('Este campo é obrigatório'),
  state: Yup.string().required('Este campo é obrigatório'),
  zip_code: Yup.string()
    .matches(/^(\d{5})-(\d{3})$/, {
      message: 'Formato incorreto',
      excludeEmptyString: true,
    })
    .required('Este campo é obrigatório'),
});

export default function Recipient({ match }) {
  const { id } = match.params;

  const [recipient, setRecipient] = useState(null);
  const [zip_code, setZip_code] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        if (id) {
          const { data } = await api.get(`recipients/${id}`);
          setRecipient(data);
          setZip_code(data.zip_code);
        }
      } catch (err) {
        toast.error('Falha ao carregar os dados');
      }
    }

    loadData();
  }, [id]);

  async function SubmitRecipient(data) {
    if (id) {
      try {
        const response = await api.put(`recipients/${id}`, data);
        if (response) {
          toast.success('Destinatário editado com sucesso!');
          history.push('/recipients');
        }
      } catch (err) {
        toast.error('Email já está cadastrado');
      }
    } else {
      await api.post('recipients', data);
      toast.success('Destinatário cadastrado com sucesso!');
      history.push('/recipients');
    }
  }

  if (id && !recipient) {
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
        onSubmit={SubmitRecipient}
        initialData={recipient || undefined}
      >
        <div>
          <strong>
            {recipient ? 'Editar Destinatário' : 'Cadastrar Destinatário'}
          </strong>
          <div>
            <button type="button" onClick={() => history.push('/recipients')}>
              <MdArrowBack size={20} color="#fff" />
              VOLTAR
            </button>
            <button type="submit">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </button>
          </div>
        </div>

        <RecipientForm>
          <strong>Nome</strong>
          <Input
            name="name"
            placeholder={recipient ? recipient.name : 'Ex: Fulano de Tal'}
          />
          <div className="linha2">
            <div>
              <strong>Rua</strong>
              <Input
                name="street"
                placeholder={recipient ? recipient.street : 'Ex: 7 de Setembro'}
              />
            </div>
            <div>
              <strong>Numero</strong>
              <Input
                name="number"
                placeholder={recipient ? recipient.number : 'Ex: 53'}
              />
            </div>
            <div>
              <strong>Complemento</strong>
              <Input
                name="complement"
                placeholder={
                  recipient ? recipient.complement : 'Ex: Perto de...'
                }
              />
            </div>
          </div>
          <div className="linha3">
            <div>
              <strong>Cidade</strong>
              <Input
                name="city"
                placeholder={recipient ? recipient.city : 'Ex: Mantena'}
              />
            </div>
            <div>
              <strong>Estado</strong>
              <Input
                name="state"
                placeholder={recipient ? recipient.state : 'Ex: Minas Gerais'}
              />
            </div>
            <div>
              <strong>CEP</strong>
              <InputMask
                name="zip_code"
                mask="99999-999"
                value={recipient ? zip_code : undefined}
                onChange={(e) => setZip_code(e.target.value)}
              >
                {() => (
                  <Input
                    name="zip_code"
                    placeholder={recipient ? zip_code : 'Ex: 23234-008'}
                  />
                )}
              </InputMask>
            </div>
          </div>
        </RecipientForm>
      </Form>
    </Container>
  );
}

Recipient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
