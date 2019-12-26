import React, { useEffect, useState, useMemo } from 'react';
import { Form, Textarea } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import api from '~/services/api';

import Label from '~/components/Label';
import Table from '~/components/Table';

import { Container } from './styles';

const schema = yup.object().shape({
  answer: yup.string().required('Resposta é obrigatória'),
});

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [helpOrder, setHelpOrder] = useState('');

  async function handleSubmit({ answer }) {
    try {
      const response = await api.post(`/help-orders/${helpOrder.id}/answer`, {
        answer,
      });

      setHelpOrders(helpOrders.filter(h => h.id !== response.data.id));

      toast.success('Pedido de auxílio respondido com sucesso!');
    } catch (err) {
      err.response.data.errors.map(error => toast.error(error.msg));
    }
    setModal(false);
  }

  function handleOpenModal(helpOrderSelected) {
    setModal(true);
    setHelpOrder(helpOrderSelected);
  }

  useEffect(() => {
    async function loadHelpOrders() {
      try {
        const response = await api.get('help-orders/unanswered');

        setHelpOrders(response.data);
      } catch (err) {
        err.response.data.errors.map(error => toast.error(error.msg));
      }
    }

    loadHelpOrders();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Aluno',
        accessor: 'student.name',
      },
      {
        id: 'actions',
        Header: () => null,
        Cell: ({ row }) => (
          <div className="actions">
            <button
              className="edit"
              type="button"
              onClick={() =>
                handleOpenModal({
                  id: row.original.id,
                  question: row.original.question,
                })
              }
            >
              Responder
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
        <h1 className="section-title">Pedidos de auxílio</h1>
      </div>
      <div className="table-wrapper">
        {helpOrders.length !== 0 ? (
          <Table columns={columns} data={helpOrders} />
        ) : (
          <div className="box">
            <p>Não existem pedidos de auxílio ainda.</p>
          </div>
        )}
      </div>
      <Modal
        focusTrapped={false}
        showCloseIcon={false}
        center
        open={modal}
        onClose={() => setModal(false)}
        styles={{
          modal: {
            background: '#fff',
            borderRadius: '4px',
            width: '450px',
            maxWidth: '100%',
            padding: '30px',
          },
        }}
      >
        <Container>
          <strong>Pergunta do aluno</strong>
          <p>{helpOrder.question}</p>
          <Form onSubmit={handleSubmit} schema={schema}>
            <Label htmlFor="answer">
              Sua resposta
              <Textarea
                name="answer"
                id="answer"
                placeholder="Digite sua resposta aqui"
              />
            </Label>
            <button type="submit">Responder aluno</button>
          </Form>
        </Container>
      </Modal>
    </>
  );
}

HelpOrders.defaultProps = {
  row: null,
};

HelpOrders.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  row: PropTypes.objectOf(PropTypes.object),
};
