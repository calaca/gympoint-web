import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Textarea } from '@rocketseat/unform';
import Modal from 'react-responsive-modal';
import Table from '~/components/Table';
import { loadRequest, answerRequest } from '~/store/modules/helpOrders/actions';
import { Container } from './styles';

export default function HelpOrderList() {
  const dispatch = useDispatch();
  const helpOrders = useSelector(state => state.helpOrders.helpOrders);
  const [modal, setModal] = useState(false);
  const [helpOrder, setHelpOrder] = useState('');

  useEffect(() => {
    dispatch(loadRequest());
  }, [dispatch]);

  function handleSubmit({ answer }) {
    dispatch(answerRequest(answer, helpOrder.id));
    setModal(false);
  }

  function handleOpenModal(helpOrderSelected) {
    setModal(true);
    setHelpOrder(helpOrderSelected);
  }

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
        <Table columns={columns} data={helpOrders} />
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
          <strong>Sua resposta</strong>
          <Form onSubmit={handleSubmit}>
            <Textarea
              name="answer"
              id="answer"
              placeholder="Digite sua resposta aqui"
            />
            <button type="submit">Responder aluno</button>
          </Form>
        </Container>
      </Modal>
    </>
  );
}

HelpOrderList.defaultProps = {
  row: null,
};

HelpOrderList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  row: PropTypes.objectOf(PropTypes.object),
};
