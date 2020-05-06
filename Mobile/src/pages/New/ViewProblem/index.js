import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Description } from './styles';
import Background from '~/components/Background';

export default function ViewProblem({ navigation }) {
  const data = navigation.getParam('data');

  return (
    <Background>
      <Container>
        <Description>{data.description}</Description>
      </Container>
    </Background>
  );
}

ViewProblem.navigationOptions = ({ navigation }) => ({
  title: 'Descrição do Problema',
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
