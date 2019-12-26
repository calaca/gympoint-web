import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Table from '~/components/Table';

import { TableWrapper } from './styles';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      try {
        const response = await api.get('enrollments');

        setEnrollments(response.data);
      } catch (err) {
        err.response.data.errors.map(error => toast.error(error.msg));
      }
    }

    loadEnrollments();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Aluno',
        accessor: 'student.name',
      },
      {
        Header: 'Plano',
        accessor: 'plan.title',
      },
      {
        Header: 'Início',
        accessor: 'start_date',
        Cell: ({ row }) => (
          <span>
            {format(parseISO(row.values.start_date), `dd 'de' MMMM 'de' yyyy`, {
              locale: pt,
            })}
          </span>
        ),
      },
      {
        Header: 'Término',
        accessor: 'end_date',
        Cell: ({ row }) => (
          <span>
            {format(parseISO(row.values.end_date), `dd 'de' MMMM 'de' yyyy`, {
              locale: pt,
            })}
          </span>
        ),
      },
      {
        Header: 'Ativa',
        accessor: 'active',
        Cell: ({ row }) => (
          <span
            className={row.values.active ? 'status-active' : 'status-inactive'}
          >
            <MdCheckCircle size={20} />
          </span>
        ),
      },
      {
        id: 'actions',
        Header: () => null,
        Cell: ({ row }) => (
          <div className="actions">
            <button className="edit" type="button" onClick={() => {}}>
              Editar
            </button>
            <button className="remove" type="button" onClick={() => {}}>
              Apagar
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Gerenciando matrículas</h1>

        <div className="cta">
          <Link to="/enrollments/add" className="btn btn-primary">
            <MdAdd size={20} /> <span>Cadastrar</span>
          </Link>
        </div>
      </div>
      <TableWrapper>
        {enrollments.length !== 0 ? (
          <Table columns={columns} data={enrollments} />
        ) : (
          <div className="box">
            <p>Não existem matrículas ainda.</p>
          </div>
        )}
      </TableWrapper>
    </>
  );
}

Enrollments.defaultProps = {
  row: null,
};

Enrollments.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  row: PropTypes.objectOf(PropTypes.object),
};
