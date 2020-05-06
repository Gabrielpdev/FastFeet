import React, { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import PropTypes from 'prop-types';

import { List, Container } from './styles';

export default function OptionsList({ children }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <button type="button" onClick={handleToggleVisible}>
        <MdMoreHoriz color="#fff" size={20} />
      </button>
      <List visible={visible} onClick={handleToggleVisible}>
        {children}
      </List>
    </Container>
  );
}

OptionsList.propTypes = {
  children: PropTypes.node.isRequired,
};
