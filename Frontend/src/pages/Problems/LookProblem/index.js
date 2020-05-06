import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, Scroll } from './styles';

export default function LookProblem({ problem, closeCallback }) {
  useEffect(() => {
    document.addEventListener('keyup', closeCallback, false);

    return () => {
      document.removeEventListener('keyup', closeCallback, false);
    };
  }, [closeCallback]);

  function handleCloseByClick(e) {
    if (e.target.id === 'look-problem-container') closeCallback();
  }

  return (
    <Container id="look-problem-container" onClick={handleCloseByClick}>
      <div>
        <strong>Vizualizar Problema:</strong>
        <Scroll>
          <span>{problem.description}</span>
        </Scroll>
      </div>
    </Container>
  );
}

LookProblem.propTypes = {
  problem: PropTypes.object.isRequired,
  closeCallback: PropTypes.func.isRequired,
};
