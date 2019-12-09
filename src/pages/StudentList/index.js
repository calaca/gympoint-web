import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { MdAdd, MdSearch } from 'react-icons/md';
import { removeRequest, loadRequest } from '~/store/modules/students/actions';
import history from '~/services/history';
import Table from '~/components/Table';

export default function StudentList() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(loadRequest(''));
  }, [dispatch]);

  useMemo(() => {
    function filterResults() {
      if (query) {
        dispatch(loadRequest(query));
      } else {
        dispatch(loadRequest(''));
      }
    }

    filterResults();
  }, [dispatch, query]);

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'E-mail',
        accessor: 'email',
      },
      {
        Header: 'Idade',
        accessor: 'age',
      },
      {
        id: 'actions',
        Header: () => null,
        Cell: ({ row }) => (
          <div className="actions">
            <button
              className="edit"
              type="button"
              onClick={() => {
                const { id } = row.original;
                const student = students.find(s => s.id === id);
                history.push(`/students/edit/${id}`, {
                  student,
                });
              }}
            >
              Editar
            </button>
            <button
              className="remove"
              type="button"
              onClick={() =>
                confirmAlert({
                  title: 'Confirmação de remoção',
                  message: 'Tem certeza que deseja apagar este aluno?',
                  buttons: [
                    {
                      label: 'Sim',
                      onClick: () => dispatch(removeRequest(row.original.id)),
                    },
                    {
                      label: 'Não',
                      onClick: () => null,
                    },
                  ],
                })
              }
            >
              Apagar
            </button>
          </div>
        ),
      },
    ],
    [dispatch, students]
  );

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Gerenciando alunos</h1>

        <div className="cta">
          <Link to="/students/add" className="btn btn-primary">
            <MdAdd size={20} /> <span>Cadastrar</span>
          </Link>
          <div className="search-wrapper">
            <MdSearch size={16} />
            <input
              className="search"
              type="text"
              placeholder="Buscar aluno"
              value={query}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="table-wrapper">
        {students.length !== 0 ? (
          <Table columns={columns} data={students} />
        ) : (
          <div className="box">
            <p>
              Não existem resultados para <strong>{query}</strong>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

StudentList.defaultProps = {
  row: null,
};

StudentList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  row: PropTypes.objectOf(PropTypes.object),
};
