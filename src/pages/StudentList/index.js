import React, { useMemo } from 'react';
import { MdAdd } from 'react-icons/md';
import Table from '~/components/Table';
import Search from '~/components/Search';

export default function StudentList() {
  function handleEdit() {}

  function handleRemove() {}

  const columns = useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Idade',
        accessor: 'age',
      },
      {
        Header: () => null,
        id: 'actions',
        // eslint-disable-next-line react/prop-types
        Cell: ({ row }) => (
          <div className="actions">
            <button
              className="edit"
              type="button"
              onClick={e => handleEdit(e, row)}
            >
              Editar
            </button>
            <button
              className="remove"
              type="button"
              onClick={e => handleRemove(e, row)}
            >
              Apagar
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = [
    {
      id: 1,
      name: 'Lorena C. F.',
      email: 'lorena.calaca.od@gmail.com',
      age: 26,
      weight: 4430,
      height: 166,
    },
    {
      id: 2,
      name: 'Lorena Calaça',
      email: 'lorena_calaca@hotmail.com',
      age: 26,
      weight: 4470,
      height: 166,
    },
  ];

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Gerenciando alunos</h1>

        <div className="cta">
          <button type="button" className="btn btn-primary" onClick={() => {}}>
            <MdAdd size={20} /> <span>Cadastrar</span>
          </button>
          <Search />
        </div>
      </div>
      <div className="table-wrapper">
        <Table columns={columns} data={data} />
      </div>
    </>
  );
}
