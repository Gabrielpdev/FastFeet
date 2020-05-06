import styled from 'styled-components/native';

export const Container = styled.View`
  background: #444;
  margin: 3px 10px;
  border-radius: 4px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
`;

export const ProblemDescription = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #fff;
  max-width: 70%;
`;

export const ProblemDate = styled.Text`
  color: #999;
`;
