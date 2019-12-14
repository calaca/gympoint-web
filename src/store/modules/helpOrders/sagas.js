import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import constants from './constants';
import { helpOrderFailure, loadSuccess, answerSuccess } from './actions';

import api from '~/services/api';

export function* loadHelpOrders() {
  try {
    const response = yield call(api.get, 'help-orders/unanswered');

    yield put(loadSuccess(response.data));
  } catch (err) {
    toast.error(
      'Falha ao carregar lista de pedidos de auxílio. Por favor, tente mais tarde.'
    );
    yield put(helpOrderFailure());
  }
}

export function* answerHelpOrder({ payload }) {
  try {
    const { answer, id } = payload;

    const response = yield call(api.post, `help-orders/${id}/answer`, {
      answer,
    });

    yield put(answerSuccess(response.data));

    toast.success('Pedido de auxílio respondido com sucesso!');
  } catch (err) {
    toast.error(
      'Falha ao responder pedido de auxílio. Por favor, tente mais tarde.'
    );
    yield put(helpOrderFailure());
  }
}

export default all([
  takeLatest(constants.helpOrdersLoadRequest, loadHelpOrders),
  takeLatest(constants.helpOrdersAnswerRequest, answerHelpOrder),
]);
