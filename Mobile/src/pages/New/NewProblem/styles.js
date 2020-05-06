import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const FormProblem = styled.ScrollView`
  width: 90%;

  border-radius: 4px;

  margin: 70px auto 0 auto;
`;

export const InputProblem = styled.TextInput`
  margin: 5px;
  border-radius: 4px;

  background: #444;
  color: #fff;
`;

export const SubmitButton = styled(Button)`
  margin: auto 5px 5px 5px;
`;
