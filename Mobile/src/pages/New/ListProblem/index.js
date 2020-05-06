import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Problems from '~/components/Problem';

import { Container, FormProblem } from './styles';
import Background from '~/components/Background';

export default function ListProblem({ navigation }) {
  const { id } = navigation.getParam('delivery');

  const [problems, setProblems] = useState('');

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`delivery/${id}/problems`);

      setProblems(response.data);
    }
    loadProblems();
  }, [id]);

  return (
    <Background>
      <Container>
        <FormProblem
          data={problems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Problems data={item} navigation={navigation} />
          )}
        />
      </Container>
    </Background>
  );
}

ListProblem.navigationOptions = ({ navigation }) => ({
  title: 'Vizualizar Problemas',
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
