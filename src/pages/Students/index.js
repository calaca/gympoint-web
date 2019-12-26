import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

import Table from '~/components/Table';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');

  async function loadStudents(q = '') {
    try {
      const response = await api.get('students', {
        params: {
          q,
        },
      });

      setStudents(response.data);
    } catch (err) {
      err.response.data.errors.map(error => toast.error(error.msg));
    }
  }

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    function filterResults() {
      if (query) {
        loadStudents(query);
      } else {
        loadStudents();
      }
    }

    filterResults();
  }, [query]);

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  async function handleDeleteStudent(id) {
    try {
      const response = await api.delete(`students/${id}`);

      setStudents(response.data);

      toast.success('Aluno apagado com sucesso!');
    } catch (err) {
      err.response.data.errors.map(error => toast.error(error.msg));
    }
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
                      onClick: () => handleDeleteStudent(row.original.id),
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
    [students]
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

Students.defaultProps = {
  row: null,
};

Students.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  row: PropTypes.objectOf(PropTypes.object),
};
