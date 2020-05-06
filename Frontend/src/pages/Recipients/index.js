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
import { Container, RecipientList } from './styles';

export default function Deliveryman() {
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadDeliverymans() {
      const response = await api.get('recipients', {
        params: { page, name: search },
      });

      setRecipients(response.data);
    }

    loadDeliverymans();
  }, [search, page]);

  const handleDelete = useCallback(
    async (recipient) => {
      const confirmDelete = window.confirm(
        `Deseja deletar o destinatário ${recipient.id} ?`
      );

      if (!confirmDelete) {
        return;
      }

      await api.delete(`recipients/${recipient.id}`);
      toast.success('O destinatário foi excluido com sucesso !');
      setRecipients(recipients.filter(({ id }) => id !== recipient.id));
    },
    [recipients]
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
      <strong>Gerenciamento de Destinatários</strong>

      <div className="header">
        <div className="search">
          <i>
            <GoSearch size={20} color="#999" />
          </i>
          <Input
            name="input"
            placeholder="Busca por destinatário"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="cadastro"
          onClick={() => history.push('/recipients/add')}
        >
          <GoPlus size={20} color="#fff" />
          CADASTRAR
        </button>
      </div>

      <RecipientList>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((recipient) => (
            <tr key={recipient.id}>
              <td>
                {recipient.id > 9 ? `#${recipient.id}` : `#0${recipient.id}`}
              </td>
              <td>{recipient.name}</td>
              <td>{`Rua ${recipient.street}, ${recipient.number}
              ${recipient.complement ? `,${recipient.complement}` : ''}
               , ${recipient.city} - ${recipient.state}`}</td>

              <td>
                <OptionsList>
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        history.push(`/recipients/add/${recipient.id}`)
                      }
                    >
                      <MdEdit size={20} />
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(recipient)}
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
      </RecipientList>
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
