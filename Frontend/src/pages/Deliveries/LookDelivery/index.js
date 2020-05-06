import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import { Container, Delivery, Date, Signature, Scroll } from './styles';

export default function LookDelivery({ delivery, closeCallback }) {
  const [description, setDescription] = useState('');

  const { start_date, end_date, canceled_at, recipient, signature } = delivery;

  useEffect(() => {
    document.addEventListener('keyup', closeCallback, false);

    return () => {
      document.removeEventListener('keyup', closeCallback, false);
    };
  }, [closeCallback]);

  let start_dateFormatted;
  let end_dateFormatted;

  if (start_date) {
    start_dateFormatted = format(parseISO(start_date), "d'/'MM'/'yyyy", {
      locale: pt,
    });
  }

  if (end_date) {
    end_dateFormatted = format(parseISO(end_date), "d'/'MM'/'yyyy", {
      locale: pt,
    });
  }

  useMemo(() => {
    async function loadDescription() {
      const response = await api.get(`delivery/${delivery.id}/problems`);

      setDescription(response.data.description);
    }
    loadDescription();
  }, [delivery]);

  function handleCloseByClick(e) {
    if (e.target.id === 'look-delivery-container') closeCallback();
  }
  return (
    <Container id="look-delivery-container" onClick={handleCloseByClick}>
      <div>
        <Delivery>
          <strong>Informações da encomenda</strong>
          <span>
            Rua: {recipient.street} , {recipient.number}
          </span>
          <span>
            {recipient.city} - {recipient.state}
          </span>
          <span>{recipient.zip_code}</span>
        </Delivery>
        {start_date ? (
          <Date>
            {canceled_at ? (
              <>
                <strong>Motivo do cancelamento:</strong>
                <Scroll>
                  <span>{description}</span>
                </Scroll>
              </>
            ) : (
              <>
                <strong>Retirada:</strong>
                <span>{start_dateFormatted}</span>
              </>
            )}

            {end_date ? (
              <>
                <strong>Entrega:</strong>
                <span>{end_dateFormatted}</span>
              </>
            ) : null}
          </Date>
        ) : (
          <Date>
            <strong>Pendente</strong>
          </Date>
        )}
        {signature ? (
          <Signature>
            <strong>Assinatura do destinatário</strong>
            <img
              src={
                signature === null
                  ? 'https://api.adorable.io/avatars/50/abott@adorable.png'
                  : signature.url
              }
              alt=""
            />
          </Signature>
        ) : null}
      </div>
    </Container>
  );
}

LookDelivery.propTypes = {
  delivery: PropTypes.object.isRequired,
  closeCallback: PropTypes.func.isRequired,
};
