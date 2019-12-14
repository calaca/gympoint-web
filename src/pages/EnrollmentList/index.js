import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { confirmAlert } from 'react-confirm-alert';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import Table from '~/components/Table';
import {
  loadRequest,
  removeRequest,
} from '~/store/modules/enrollments/actions';

import history from '~/services/history';

import { TableWrapper } from './styles';

export default function EnrollmentList() {
  const dispatch = useDispatch();
  const enrollments = useSelector(state => state.enrollments.enrollments);

  useEffect(() => {
    dispatch(loadRequest());
  }, [dispatch]);

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
            <button
              className="edit"
              type="button"
              onClick={() => {
                const { id } = row.original;
                const enrollment = enrollments.find(s => s.id === id);
                history.push(`/enrollments/edit/${id}`, {
                  enrollment,
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
                  message: 'Tem certeza que deseja apagar esta matrícula?',
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
    [dispatch, enrollments]
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

EnrollmentList.defaultProps = {
  row: null,
};

EnrollmentList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  row: PropTypes.objectOf(PropTypes.object),
};
