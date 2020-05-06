import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 30px 15px;
  background: #000;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Deliveryman = styled.View`
  text-align: left;
`;

export const Avatar = styled.Image`
  height: 90px;
  width: 90px;
  border-radius: 45px;
`;

export const DeliverymanWelcome = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const DeliverymanName = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #fff;
`;

export const Body = styled.View`
  background: #000;
`;

export const DeliveriesHeader = styled.View`
  padding: 0 15px;

  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const DeliveiresText = styled.Text`
  margin: 0 5px;
  color: ${(props) => (props.view ? '#990000' : '#fff')};

  font-size: 14px;
`;

export const DeliveiresTitle = styled.Text`
  font-size: 23px;
  font-weight: bold;
  color: #fff;
`;

export const DeliveriesRoutes = styled.View`
  flex-direction: row;
`;

export const Link = styled.TouchableOpacity``;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const BackgroundList = styled(LinearGradient).attrs({
  colors: ['#000', '#350903', '#640903'],
})`
  height: 69%;
`;
