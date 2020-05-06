import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import Logout from 'react-native-vector-icons/Entypo';

import api from '~/services/api';

import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import Delivery from '~/components/Delivery';

import {
  Container,
  Header,
  Avatar,
  Deliveryman,
  DeliverymanWelcome,
  DeliverymanName,
  Body,
  DeliveriesHeader,
  BackgroundList,
  List,
  DeliveiresText,
  DeliveiresTitle,
  DeliveriesRoutes,
  Link,
} from './styles';

function Deliveries({ navigation, isFocused }) {
  const [deliveries, setDeliveries] = useState([]);
  const [route, setRoute] = useState(true);
  const [page, setPage] = useState('Pendentes');

  const deliveryman = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDeliveries() {
      if (page === 'Pendentes') {
        const response = await api.get(
          `deliveryman/deliveries/${deliveryman.id}`
        );

        setDeliveries(response.data);
      } else {
        const response = await api.get(
          `deliveryman/${deliveryman.id}/deliveries`
        );

        setDeliveries(response.data);
      }
    }
    if (isFocused) {
      loadDeliveries();
    }
  }, [deliveryman.id, page, isFocused]);

  function handleLogOut() {
    dispatch(signOut());
  }

  function handleRoute() {
    setRoute(!route);
    if (page === 'Pendentes') {
      setPage('Entregues');
    } else {
      setPage('Pendentes');
    }
  }

  return (
    <Container>
      <Header>
        <Avatar
          source={{
            uri:
              deliveryman.avatar === null
                ? `https://api.adorable.io/avatars/50/${deliveryman.name}.png`
                : deliveryman.avatar.url,
          }}
        />
        <Deliveryman>
          <DeliverymanWelcome>Bem-vindo de volta,</DeliverymanWelcome>
          <DeliverymanName>{deliveryman.name}</DeliverymanName>
        </Deliveryman>
        <Link onPress={handleLogOut}>
          <Logout name="log-out" size={20} color="#990000" />
        </Link>
      </Header>
      <Body>
        <DeliveriesHeader>
          <DeliveiresTitle>Entregas</DeliveiresTitle>
          <DeliveriesRoutes>
            <Link onPress={handleRoute}>
              <DeliveiresText view={route}> Pendentes</DeliveiresText>
            </Link>
            <Link onPress={handleRoute}>
              <DeliveiresText view={!route}>Entregues</DeliveiresText>
            </Link>
          </DeliveriesRoutes>
        </DeliveriesHeader>
      </Body>
      <BackgroundList>
        <List
          data={deliveries}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Delivery
              data={item}
              onDetail={() => navigation.navigate('Detail', { item })}
            />
          )}
        />
      </BackgroundList>
      <Background />
    </Container>
  );
}

Deliveries.navigationOptions = ({ navigation }) => ({
  title: '',
});

export default withNavigationFocus(Deliveries);
