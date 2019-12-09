import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import constants from './constants';
import {
  loadSuccess,
  registerSucces,
  studentFalure,
  editSuccess,
  removeSuccess,
} from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* loadStudents() {
  try {
    const response = yield call(api.get, 'students');

    yield put(loadSuccess(response.data));
  } catch (err) {
    toast.error(
      'Falha ao carregar lista de alunos. Por favor, tente mais tarde.'
    );
    yield put(studentFalure());
  }
}

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

    toast.success('Aluno adicionado com sucesso!');

    history.push('/students');
  } catch (err) {
    toast.error('Falha no cadastro de aluno. Por favor, verifique seus dados.');
    yield put(studentFalure());
  }
}

export function* editStudent({ payload }) {
  try {
    const { student, id } = payload;

    const response = yield call(api.put, `students/${id}`, student);

    yield put(editSuccess(response.data));

    toast.success('Aluno editado com sucesso!');

    history.push('/students');
  } catch (err) {
    toast.error('Falha na edição de aluno. Por favor, verifique seus dados.');
    yield put(studentFalure());
  }
}

export function* removeStudent({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `students/${id}`);

    yield put(removeSuccess(response.data));

    toast.success('Aluno deletado com sucesso!');
  } catch (err) {
    toast.error('Falha ao apagar aluno. Por favor, verifique seus dados.');
    yield put(studentFalure());
  }
}

export default all([
  takeLatest(constants.studentsLoadRequest, loadStudents),
  takeLatest(constants.studentsRegisterRequest, registerStudent),
  takeLatest(constants.studentsEditRequest, editStudent),
  takeLatest(constants.studentsRemoveRequest, removeStudent),
]);
