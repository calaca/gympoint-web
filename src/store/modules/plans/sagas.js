import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import constants from './constants';
import { planFailure, loadSuccess } from './actions';

import api from '~/services/api';

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

export default all([takeLatest(constants.plansLoadRequest, loadPlans)]);
