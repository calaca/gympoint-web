import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

export default function Search({ onChange }) {
  return (
    <div className="search-wrapper">
      <MdSearch size={16} />
      <input
        className="search"
        type="text"
        placeholder="Buscar aluno"
        onChange={onChange}
      />
    </div>
  );
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
};
