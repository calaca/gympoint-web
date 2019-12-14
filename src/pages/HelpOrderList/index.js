import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Textarea } from '@rocketseat/unform';
import Modal from 'react-responsive-modal';
import * as yup from 'yup';
import Table from '~/components/Table';
import { loadRequest, answerRequest } from '~/store/modules/helpOrders/actions';
import { Container, Label } from './styles';

const schema = yup.object().shape({
  answer: yup.string().required('Resposta é obrigatória'),
});

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

HelpOrderList.defaultProps = {
  row: null,
};

HelpOrderList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  row: PropTypes.objectOf(PropTypes.object),
};
