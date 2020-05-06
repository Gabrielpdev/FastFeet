import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 5px;
  background: #333;
  margin-bottom: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin: 10px 0 10px 10px;
  align-items: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-weight: bold;
  align-items: baseline;
  font-size: 15px;

  margin-left: 5px;
`;

export const TimeLine = styled.View``;

export const FooterItem = styled.View``;

export const Small = styled.Text`
  font-size: 10px;
  color: #fff;
`;

export const Stong = styled.Text`
  font-size: 12px;

  color: #fff;
  font-weight: bold;
`;

export const Link = styled.TouchableOpacity``;

export const Details = styled.Text`
  font-size: 12px;

  color: #fff;
`;

export const Footer = styled.View`
  margin: 0 15px 15px 15px;

  flex-direction: row;

  justify-content: space-between;
  align-items: flex-end;
`;
