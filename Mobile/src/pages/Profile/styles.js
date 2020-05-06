import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const ProfileView = styled.View`
  background: #333;
  margin: auto;
  border-radius: 4px;
  padding: 10px;
`;

export const Avatar = styled.Image`
  margin: auto;
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;

export const ProfileDetail = styled.View`
  padding: 10px;
`;

export const ProfileDetailView = styled.View`
  margin-top: 10px;
`;

export const Span = styled.Text`
  color: #777;
  font-size: 15px;
`;

export const Strong = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const LogoutButton = styled(Button)`
  min-width: 90%;
`;
