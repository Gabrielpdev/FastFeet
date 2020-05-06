import React, { useState } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, FormProblem, InputProblem, SubmitButton } from './styles';
import Background from '~/components/Background';

export default function NewProblem({ navigation }) {
  const { id } = navigation.getParam('delivery');

  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      await api.post(`delivery/${id}/problems`, { description: problem });
      Toast.show('Problema enviado');
      setLoading(false);
      navigation.goBack();
    } catch (err) {
      setLoading(false);

      console.tron.log({ err });
      Alert.alert(
        'Erro ao enviar problema',
        'Não foi possível enviar  o problem'
      );
    }
  }

  return (
    <Background>
      <Container>
        <FormProblem>
          <InputProblem
            placeholder="Informe aqui o problema que ocorreu na entrega."
            placeholderTextColor="#999"
            multiline
            value={problem}
            onChangeText={setProblem}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Enviar
          </SubmitButton>
        </FormProblem>
      </Container>
    </Background>
  );
}

NewProblem.navigationOptions = ({ navigation }) => ({
  title: 'Informar Problema',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
