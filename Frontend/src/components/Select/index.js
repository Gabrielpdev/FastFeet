import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SelectComponent({
  label,
  placeholder,
  options,
  onChange,
  defaultValue,
}) {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,

      backgroundColor: state.isSelected ? '#990000' : null,
      color: state.isSelected ? '#fff' : '#000',
    }),
  };

  return (
    <Container>
      <strong>{label}</strong>
      <Select
        styles={customStyles}
        classNamePrefix="select-react"
        isSearchable={false}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </Container>
  );
}

SelectComponent.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
