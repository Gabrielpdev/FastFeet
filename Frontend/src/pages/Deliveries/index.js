import React, { useEffect, useState, useCallback } from 'react';
import { GoPlus, GoTrashcan, GoEye, GoSearch } from 'react-icons/go';
import {
  MdEdit,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';

import api from '~/services/api';
import history from '~/services/history';

import OptionsList from '~/components/OptionsList';
import LookDelivery from './LookDelivery';
import { Container, DeliveryList, DeliveryStatus } from './styles';

export default function Deliveries() {
  const [page, setPage] = useState(1);
  const [looking, setLooking] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries', {
        params: { page, product: search },
      });

      setDeliveries(response.data);
    }

    loadDeliveries();
  }, [search, page]);

  const handleLook = useCallback((delivery) => {
    setLooking(delivery);
  }, []);

  const handleDelete = useCallback(
    async (delivery) => {
      const confirmDelete = window.confirm(
        `Deseja deletar a encomenda ${delivery.id} ?`
      );

      if (!confirmDelete) {
        return;
      }

      await api.delete(`deliveries/${delivery.id}`);
      toast.success('A encomenda foi excluida com sucesso !');
      setDeliveries(deliveries.filter(({ id }) => id !== delivery.id));
    },
    [deliveries]
  );

  function nextPage() {
    setPage(page + 1);
  }

  function prevPage() {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  }

  return (
    <Container>
      <strong>Gerenciamento de Encomendas</strong>

      <div className="header">
        <div className="search">
          <i>
            <GoSearch size={20} color="#999" />
          </i>
          <Input
            name="input"
            placeholder="Busca por encomendas"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="cadastro"
          onClick={() => history.push('/deliveries/delivery')}
        >
          <GoPlus size={20} color="#fff" />
          CADASTRAR
        </button>
      </div>

      <DeliveryList>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinátario</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td>
                {delivery.id > 9 ? `#${delivery.id}` : `#0${delivery.id}`}
              </td>
              <td>{delivery.recipient.name}</td>
              <td>
                <div>
                  <img
                    src={
                      delivery.deliveryman.avatar === null
                        ? 'https://avatars.dicebear.com/v2/avataaars/example.svg'
                        : delivery.deliveryman.avatar.url
                    }
                    alt=""
                  />
                  <td>{delivery.deliveryman.name}</td>
                </div>
              </td>
              <td>{delivery.recipient.city}</td>
              <td>{delivery.recipient.state}</td>
              <td>
                <DeliveryStatus status={delivery.status}>
                  {delivery.status}
                </DeliveryStatus>
              </td>
              <td>
                <OptionsList>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleLook({ ...delivery })}
                    >
                      <GoEye size={20} />
                      Visualizar
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        history.push(`/deliveries/delivery/${delivery.id}`)
                      }
                    >
                      <MdEdit size={20} />
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(delivery)}
                    >
                      <GoTrashcan size={20} />
                      Deletar
                    </button>
                  </li>
                </OptionsList>
              </td>
            </tr>
          ))}
        </tbody>
      </DeliveryList>
      <div className="pagination">
        <button type="button" onClick={() => prevPage()}>
          <MdKeyboardArrowLeft color="#FFF" size={20} />
        </button>
        <button type="button" onClick={() => nextPage()}>
          <MdKeyboardArrowRight color="#FFF" size={20} />
        </button>
      </div>
      {looking && (
        <LookDelivery
          delivery={looking}
          closeCallback={() => setLooking(null)}
        />
      )}
    </Container>
  );
}
