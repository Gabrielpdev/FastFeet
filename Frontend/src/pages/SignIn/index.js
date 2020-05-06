import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail valido')
    .required('E-mail é obrigatorio'),
  password: Yup.string().required('Senha é obrigatoria'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <div>
      <img src={logo} alt="" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <strong>SEU E-MAIL</strong>
        <Input name="email" type="email" placeholder="examplo@email.com" />

        <strong>SUA SENHA</strong>
        <Input name="password" type="password" placeholder="******" />

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no FastFeet'}
        </button>
      </Form>
    </div>
  );
}
