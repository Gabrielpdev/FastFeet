import React, { useEffect, useState, useCallback } from 'react';
import { GoPlus, GoTrashcan, GoSearch } from 'react-icons/go';
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
import { Container, DeliverymanList } from './styles';

export default function Deliveryman() {
  const [deliverymans, setDelivevrymans] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadDeliverymans() {
      const response = await api.get('deliveryman', {
        params: { page, name: search },
      });

      setDelivevrymans(response.data);
    }

    loadDeliverymans();
  }, [search, page]);

  const handleDelete = useCallback(
    async (deliverymen) => {
      const confirmDelete = window.confirm(
        `Deseja deletar o entregador ${deliverymen.id} ?`
      );

      if (!confirmDelete) {
        return;
      }

      await api.delete(`deliveryman/${deliverymen.id}`);
      toast.success('O entregador foi excluida com sucesso !');
      setDelivevrymans(deliverymans.filter(({ id }) => id !== deliverymen.id));
    },
    [deliverymans]
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
      <strong>Gerenciamento de Entregadores</strong>

      <div className="header">
        <div className="search">
          <i>
            <GoSearch size={20} color="#999" />
          </i>
          <Input
            name="input"
            placeholder="Busca por entregadores"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="cadastro"
          onClick={() => history.push('/deliveryman/add')}
        >
          <GoPlus size={20} color="#fff" />
          CADASTRAR
        </button>
      </div>

      <DeliverymanList>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymans.map((deliveryman) => (
            <tr key={deliveryman.id}>
              <td>
                {deliveryman.id > 9
                  ? `#${deliveryman.id}`
                  : `#0${deliveryman.id}`}
              </td>
              <td>
                <img
                  src={
                    deliveryman.avatar === null
                      ? 'https://avatars.dicebear.com/v2/avataaars/example.svg'
                      : deliveryman.avatar.url
                  }
                  alt=""
                />
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>

              <td>
                <OptionsList>
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        history.push(`/deliveryman/add/${deliveryman.id}`)
                      }
                    >
                      <MdEdit size={20} />
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(deliveryman)}
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
      </DeliverymanList>
      <div className="pagination">
        <button type="button" onClick={() => prevPage()}>
          <MdKeyboardArrowLeft color="#FFF" size={20} />
        </button>
        <button type="button" onClick={() => nextPage()}>
          <MdKeyboardArrowRight color="#FFF" size={20} />
        </button>
      </div>
    </Container>
  );
}
