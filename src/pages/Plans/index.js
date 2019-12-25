import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import PropTypes from 'prop-types';

import api from '~/services/api';
// import history from '~/services/history';

import Table from '~/components/Table';
import { formatPrice } from '~/utils/helpers';

import { TableWrapper } from './styles';

export default function PlanList() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await api.get('plans');

        setPlans(response.data);
      } catch (err) {
        err.response.data.errors.map(error => toast.error(error.msg));
      }
    }

    loadPlans();
  }, []);

  async function handleDeletePlan(id) {
    try {
      const response = await api.delete(`plans/${id}`);

      setPlans(response.data);
    } catch (err) {
      err.response.data.errors.map(error => toast.error(error.msg));
    }
  }

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
        Cell: ({ row }) => <span>{formatPrice(row.values.price)}</span>,
      },
      {
        id: 'actions',
        Header: () => null,
        Cell: ({ row }) => (
          <div className="actions">
            <button className="edit" type="button" onClick={() => {}}>
              Editar
            </button>
            <button
              className="remove"
              type="button"
              onClick={() =>
                confirmAlert({
                  title: 'Confirmação de remoção',
                  message: 'Tem certeza que deseja apagar este plano?',
                  buttons: [
                    {
                      label: 'Sim',
                      onClick: () => handleDeletePlan(row.original.id),
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
    []
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
        {plans.length !== 0 ? (
          <Table columns={columns} data={plans} />
        ) : (
          <div className="box">
            <p>Não existem planos ainda.</p>
          </div>
        )}
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
