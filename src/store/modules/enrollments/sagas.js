import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import constants from './constants';
import { enrollmentFailure, loadSuccess } from './actions';

import api from '~/services/api';
// import history from '~/services/history';

export function* loadEnrollments() {
  try {
    const response = yield call(api.get, 'enrollments');

    yield put(loadSuccess(response.data));
  } catch (err) {
    toast.error(
      'Falha ao carregar lista de matrículas. Por favor, tente mais tarde.'
    );
    yield put(enrollmentFailure());
  }
}

export default all([
  takeLatest(constants.enrollmentsLoadRequest, loadEnrollments),
]);
