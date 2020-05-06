import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Container, ProblemDescription, ProblemDate } from './styles';

export default function Problem({ data, navigation }) {
  const DateFormatted = format(parseISO(data.created_at), "d'/'MM'/'yyyy", {
    locale: pt,
  });

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ViewProblem', { data })}
    >
      <Container>
        <ProblemDescription>{data.description}</ProblemDescription>
        <ProblemDate>{DateFormatted}</ProblemDate>
      </Container>
    </TouchableOpacity>
  );
}
