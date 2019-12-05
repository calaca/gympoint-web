import { takeLatest, call, put, all } from 'redux-saga/effects';
import constants from './constants';
import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    history.push('/students');
  } catch (err) {
    yield put(signFailure());
  }
}

export default all([takeLatest(constants.authSignInRequest, signIn)]);
