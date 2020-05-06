import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../../components/Background';

import logo from '~/assets/logo.png';
import { Container, Form, FormInput, ErrorLabel, SubmitButton } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState();
  const [error, setError] = useState(false);

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    if (!id) setError(true);
    else dispatch(signInRequest(id));
  }

  useEffect(() => {
    setError(false);
  }, [id]);

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            keyboardType="number-pad"
            icon="lock-outline"
            placeholder="Digite seu ID de cadastro"
            returnKeyType="send"
            autoCorrect={false}
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          {error && <ErrorLabel>Campo obrigatório</ErrorLabel>}
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
