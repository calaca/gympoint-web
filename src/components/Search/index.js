import React from 'react';
import { MdSearch } from 'react-icons/md';

export default function Search() {
  return (
    <div className="search-wrapper">
      <MdSearch size={16} />
      <input className="search" type="text" placeholder="Buscar aluno" />
    </div>
  );
}
