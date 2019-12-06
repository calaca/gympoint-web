import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import constants from './constants';
import { registerSucces, registerFailure } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* registerStudent({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    const response = yield call(api.post, 'students', {
      name,
      email,
      age,
      weight,
      height,
    });

    yield put(registerSucces(response.data));

    history.push('/students');
  } catch (err) {
    toast.error('Falha no cadastro. Por favor, verifique seus dados.');
    yield put(registerFailure());
  }
}

export default all([
  takeLatest(constants.studentRegisterRequest, registerStudent),
]);
