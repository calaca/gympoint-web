import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Table from '~/components/Table';
import { loadRequest } from '~/store/modules/plans/actions';
import currencyFormatter from '~/utils/currencyFormatter';

import history from '~/services/history';

import { TableWrapper } from './styles';

export default function PlanList() {
  const dispatch = useDispatch();
  const plans = useSelector(state => state.plans.plans);

  useEffect(() => {
    dispatch(loadRequest());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: 'Título',
        accessor: 'title',
      },
      {
        Header: 'Duração (mês)',
        accessor: 'duration',
      },
      {
        Header: 'Valor (mês)',
        accessor: 'price',
        Cell: ({ row }) => (
          <span>R$ {currencyFormatter(row.values.price)}</span>
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
                const plan = plans.find(p => p.id === id);
                history.push(`/plans/edit/${id}`, {
                  plan,
                });
              }}
            >
              Editar
            </button>
            <button className="remove" type="button" onClick={() => {}}>
              Apagar
            </button>
          </div>
        ),
      },
    ],
    [plans]
  );

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Gerenciando planos</h1>

        <div className="cta">
          <Link to="/plans/add" className="btn btn-primary">
            <MdAdd size={20} /> <span>Cadastrar</span>
          </Link>
        </div>
      </div>
      <TableWrapper>
        <Table columns={columns} data={plans} />
      </TableWrapper>
    </>
  );
}

PlanList.defaultProps = {
  row: null,
};

PlanList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  row: PropTypes.objectOf(PropTypes.object),
};
