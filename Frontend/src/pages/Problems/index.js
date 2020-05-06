import React, { useEffect, useState, useCallback } from 'react';
import { GoTrashcan, GoEye } from 'react-icons/go';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';

import OptionsList from '~/components/OptionsList';
import LookProblem from './LookProblem';
import { Container, ProblemList, Description } from './styles';

export default function Problems() {
  const [looking, setLooking] = useState(null);
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadDeliverymans() {
      const response = await api.get('delivery/problems');

      setProblems(response.data);
    }

    loadDeliverymans();
  }, []);

  const handleDelete = useCallback(
    async (problem) => {
      const confirmDelete = window.confirm(
        `Deseja cancelar a encomenda ${problem.delivery.id} ?`
      );

      if (!confirmDelete) {
        return;
      }

      await api.delete(`problem/${problem.id}/cancel-delivery`);
      toast.success('A encomenda foi cancelada com sucesso !');
      setProblems(problems.filter(({ id }) => id !== problem.id));
    },
    [problems]
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

  const handleLook = useCallback((problem) => {
    setLooking(problem);
  }, []);

  return (
    <Container>
      <strong>Gerenciamento de Problemas</strong>

      <ProblemList>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>
                {problem.delivery.id > 9
                  ? `#${problem.delivery.id}`
                  : `#0${problem.delivery.id}`}
              </td>
              <Description>{problem.description}</Description>
              <td>
                <OptionsList>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleLook({ ...problem })}
                    >
                      <GoEye size={20} />
                      Visualizar
                    </button>
                    <button type="button" onClick={() => handleDelete(problem)}>
                      <GoTrashcan size={20} />
                      Cancelar encomenda
                    </button>
                  </li>
                </OptionsList>
              </td>
            </tr>
          ))}
        </tbody>
      </ProblemList>
      <div className="pagination">
        <button type="button" onClick={() => prevPage()}>
          <MdKeyboardArrowLeft color="#FFF" size={20} />
        </button>
        <button type="button" onClick={() => nextPage()}>
          <MdKeyboardArrowRight color="#FFF" size={20} />
        </button>
      </div>
      {looking && (
        <LookProblem problem={looking} closeCallback={() => setLooking(null)} />
      )}
    </Container>
  );
}
