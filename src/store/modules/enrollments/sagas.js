import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import constants from './constants';
import {
  enrollmentFailure,
  loadSuccess,
  registerSuccess,
  removeSuccess,
} from './actions';

import api from '~/services/api';
import history from '~/services/history';

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

export function* registerEnrollment({ payload }) {
  try {
    const { student_id, plan_id, start_date } = payload;

    const response = yield call(api.post, 'enrollments', {
      student_id,
      plan_id,
      start_date,
    });

    toast.success('Matrícula adicionada com sucesso!');

    yield put(registerSuccess(response.data));

    history.push('/enrollments');
  } catch (err) {
    err.response.data.errors.map(error => toast.error(error.msg));
    yield put(enrollmentFailure());
  }
}

export function* removeEnrollment({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `enrollments/${id}`);

    yield put(removeSuccess(response.data));

    toast.success('Matrícula apagada com sucesso!');
  } catch (err) {
    toast.error('Falha ao apagar matrícula. Por favor, verifique seus dados.');
    yield put(enrollmentFailure());
  }
}

export default all([
  takeLatest(constants.enrollmentsLoadRequest, loadEnrollments),
  takeLatest(constants.enrollmentsRegisterRequest, registerEnrollment),
  takeLatest(constants.enrollmentsRemoveRequest, removeEnrollment),
]);
