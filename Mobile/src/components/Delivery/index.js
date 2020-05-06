import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Timeline from '~/pages/Deliveries/Timeline';

import {
  Container,
  Header,
  Title,
  Small,
  Stong,
  Link,
  Details,
  FooterItem,
  Footer,
} from './styles';

export default function Delivery({ data, onDetail }) {
  const createdFormatted = format(parseISO(data.created_at), "d'/'MM'/'yyyy", {
    locale: pt,
  });

  const nameIcon = useMemo(() => {
    if (data.end_date !== null) {
      return 'truck-check';
    }
    if (data.start_date !== null) {
      return 'truck-fast';
    }
    return 'truck-delivery';
  }, [data.start_date, data.end_date]);

  return (
    <Container>
      <Header>
        <Icon name={nameIcon} size={20} color="#fff" />

        <Title>
          {data.id > 9 ? `Encomenda ${data.id}` : `Encomenda 0${data.id}`}
        </Title>
      </Header>
      <Timeline start={data.start_date} end={data.end_date} />

      <Footer>
        <FooterItem>
          <Small>Data</Small>
          <Stong>{createdFormatted}</Stong>
        </FooterItem>

        <FooterItem>
          <Small>Cidade</Small>
          <Stong>{data.recipient.city}</Stong>
        </FooterItem>

        <FooterItem>
          <Link onPress={onDetail}>
            <Details>Ver detalhes</Details>
          </Link>
        </FooterItem>
      </Footer>
    </Container>
  );
}
