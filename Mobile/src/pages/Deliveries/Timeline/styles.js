import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  align-self: stretch;
  margin: 15px 0 10px;
  padding: 0 10px;
`;

export const Line = styled.View`
  height: 1px;
  background: #fff;
  border: 1px solid #fff;
  margin-left: 23px;
  margin-right: 16px;
  margin-top: 0px;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: -8px;
`;

export const Dot = styled.View`
  width: 15px;
  height: 15px;
  border: 1px solid #fff;
  border-radius: 7px;
  background: ${(props) => (props.filled ? '#990000' : '#FFFFFF')};
  margin-bottom: 5px;
`;

export const LabelContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.Text`
  color: #999999;
  font-weight: bold;
  font-size: 9px;
  max-width: 50px;
  text-align: center;
`;
