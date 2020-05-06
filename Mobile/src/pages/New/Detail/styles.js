import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Button from '~/components/Button';

export const Container = styled.View`
  margin-top: 60px;
  flex: 1;
`;

export const Details = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 20px;
  border-radius: 5px;
  background: #444;
`;

export const Header = styled.View`
  padding: 10px;
`;

export const Title = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleText = styled.Text`
  margin-left: 5px;
  align-items: center;
  color: #ff0000;
  font-size: 18px;
  font-weight: bold;
`;

export const Group = styled.View`
  margin-top: 5px;
`;

export const Strong = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const Span = styled.Text`
  color: #888;
  font-size: 14px;
`;

export const Body = styled.View`
  padding: 10px;
`;

export const GroupData = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const Signature = styled.Image`
  width: 300px;
  height: 100px;
`;

export const Footer = styled.View`
  background: #333;
  border-radius: 4px;
  margin: 15px 10px;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

export const SubmitButton = styled(TouchableOpacity)``;

export const ViewButton = styled.View`
  background: #333;
  border-radius: 4px;

  width: 100%;
  max-width: 90px;
  padding: 10px;

  align-items: center;
`;

export const TextButton = styled.Text`
  text-align: center;
  margin: auto;
  color: #fff;
`;

export const ButtonWithdrwal = styled(Button)`
  width: 100%;
`;
