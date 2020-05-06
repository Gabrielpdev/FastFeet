/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '~/services/api';

import Background from '~/components/Background';
import {
  Container,
  Details,
  Header,
  Title,
  TitleText,
  Group,
  Strong,
  Span,
  Body,
  GroupData,
  Signature,
  Footer,
  SubmitButton,
  ViewButton,
  TextButton,
  ButtonWithdrwal,
} from './styles';

export default function Datail({ navigation }) {
  const delivery = navigation.getParam('item');

  const startDateFormatted = useMemo(() => {
    if (delivery.start_date !== null) {
      return format(parseISO(delivery.start_date), "d'/'MM'/'yyyy", {
        locale: pt,
      });
    }
    return '- -/- -/- - ';
  }, [delivery.start_date]);

  const endDateFormatted = useMemo(() => {
    if (delivery.end_date !== null) {
      return format(parseISO(delivery.end_date), "d'/'MM'/'yyyy", {
        locale: pt,
      });
    }
    return '- -/- -/- - ';
  }, [delivery.end_date]);

  async function handleWithdrwal() {
    await api.put(`delivery/${delivery.id}`);
    navigation.goBack();
  }

  return (
    <Background>
      <Container>
        <Details>
          <Header>
            <Title>
              <Icon name="truck-fast" size={20} color="#ff0000" />
              <TitleText>Informações da entrega</TitleText>
            </Title>

            <Group>
              <Strong>DESTINATÁRIO</Strong>
              <Span>{delivery.recipient.name}</Span>
            </Group>

            <Group>
              <Strong>ENDEREÇO DE ENTREGA</Strong>
              <Span>{`Rua ${delivery.recipient.street}, ${delivery.recipient.number}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zip_code}`}</Span>
            </Group>

            <Group>
              <Strong>PRODUTO</Strong>
              <Span>{delivery.product}</Span>
            </Group>
          </Header>

          <Body>
            <Title>
              <Icon name="calendar" size={20} color="#ff0000" />
              <TitleText>Situação da entrega</TitleText>
            </Title>

            <Group>
              <Strong>STATUS</Strong>
              <Span>{delivery.status}</Span>
            </Group>

            <GroupData>
              <Group>
                <Strong>DATA DE RETIRADA</Strong>
                <Span>{startDateFormatted}</Span>
              </Group>

              <Group>
                <Strong>DATA DE ENTREGA</Strong>
                <Span>{endDateFormatted}</Span>
              </Group>
            </GroupData>
            {delivery.end_date ? (
              <Signature source={{ uri: delivery.signature.url }} />
            ) : (
              <></>
            )}
          </Body>

          <Footer>
            {delivery.end_date ? (
              <TextButton>Produto Entregue</TextButton>
            ) : delivery.start_date ? (
              <>
                <SubmitButton
                  onPress={() =>
                    navigation.navigate('NewProblem', { delivery })
                  }
                >
                  <ViewButton>
                    <Icon name="cancel" size={20} color="#ff0000" />
                    <TextButton>Informar Problema</TextButton>
                  </ViewButton>
                </SubmitButton>
                <SubmitButton
                  onPress={() =>
                    navigation.navigate('ListProblem', { delivery })
                  }
                >
                  <ViewButton>
                    <Icon
                      name="information-outline"
                      size={20}
                      color="#EDEC0C"
                    />
                    <TextButton>Vizualizar Problemas</TextButton>
                  </ViewButton>
                </SubmitButton>
                <SubmitButton
                  onPress={() => navigation.navigate('Confirm', { delivery })}
                >
                  <ViewButton>
                    <Icon
                      name="check-circle-outline"
                      size={20}
                      color="#0AB804"
                    />
                    <TextButton>Confirmar Entrega</TextButton>
                  </ViewButton>
                </SubmitButton>
              </>
            ) : (
              <ButtonWithdrwal onPress={handleWithdrwal}>
                Retirar Produto
              </ButtonWithdrwal>
            )}
          </Footer>
        </Details>
      </Container>
    </Background>
  );
}

Datail.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes da encomenda',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
