import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import constants from './constants';
import {
  planFailure,
  loadSuccess,
  registerSuccess,
  editSuccess,
  removeSuccess,
} from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* loadPlans() {
  try {
    const response = yield call(api.get, 'plans');

    yield put(loadSuccess(response.data));
  } catch (err) {
    toast.error(
      'Falha ao carregar lista de planos. Por favor, tente mais tarde.'
    );
    yield put(planFailure());
  }
}

export function* registerPlan({ payload }) {
  try {
    const { title, duration, price } = payload;

    const response = yield call(api.post, 'plans', {
      title,
      duration,
      price,
    });

    toast.success('Plano adicionado com sucesso!');

    yield put(registerSuccess(response.data));

    history.push('/plans');
  } catch (err) {
    toast.error('Falha no cadastro de plano. Por favor, verifique seus dados.');
    yield put(planFailure());
  }
}

export function* editPlan({ payload }) {
  try {
    const { plan, id } = payload;

    const response = yield call(api.put, `plans/${id}`, plan);

    yield put(editSuccess(response.data));

    toast.success('Plano alterado com sucesso!');

    history.push('/plans');
  } catch (err) {
    toast.error('Falha na edição de plano. Por favor, verifique seus dados.');
    yield put(planFailure());
  }
}

export function* removePlan({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `plans/${id}`);

    yield put(removeSuccess(response.data));

    toast.success('Plano apagado com sucesso!');
  } catch (err) {
    toast.error('Falha ao apagar plano. Por favor, verifique seus dados.');
    yield put(planFailure());
  }
}

export default all([
  takeLatest(constants.plansLoadRequest, loadPlans),
  takeLatest(constants.plansRegisterRequest, registerPlan),
  takeLatest(constants.plansEditRequest, editPlan),
  takeLatest(constants.plansRemoveRequest, removePlan),
]);
