import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import {
  Container,
  ProfileView,
  Avatar,
  ProfileDetail,
  ProfileDetailView,
  Span,
  Strong,
  LogoutButton,
} from './styles';

export default function Profile() {
  const deliveryman = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();

  const DateFormatted = format(
    parseISO(deliveryman.created_at),
    "d'/'MM'/'yyyy",
    {
      locale: pt,
    }
  );

  function handleLogOut() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <ProfileView>
          <Avatar
            source={{
              uri:
                deliveryman.avatar === null
                  ? `https://api.adorable.io/avatars/50/${deliveryman.name}.png`
                  : deliveryman.avatar.url,
            }}
          />
          <ProfileDetail>
            <ProfileDetailView>
              <Span>Nome Completo</Span>
              <Strong>{deliveryman.name}</Strong>
            </ProfileDetailView>

            <ProfileDetailView>
              <Span>Email</Span>
              <Strong>{deliveryman.email}</Strong>
            </ProfileDetailView>

            <ProfileDetailView>
              <Span>Data de Cadastro</Span>
              <Strong>{DateFormatted}</Strong>
            </ProfileDetailView>
          </ProfileDetail>
          <LogoutButton onPress={handleLogOut}>Logout</LogoutButton>
        </ProfileView>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
