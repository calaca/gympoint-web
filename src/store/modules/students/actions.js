import constants from './constants';

export function loadRequest(query) {
  return {
    type: constants.studentsLoadRequest,
    payload: { query },
  };
}

export function loadSuccess(students) {
  return {
    type: constants.studentsLoadSuccess,
    payload: { students },
  };
}

export function registerRequest(name, email, age, weight, height) {
  return {
    type: constants.studentsRegisterRequest,
    payload: { name, email, age, weight, height },
  };
}

export function registerSucces(student) {
  return {
    type: constants.studentsRegisterSuccess,
    payload: { student },
  };
}

export function editRequest(student, id) {
  return {
    type: constants.studentsEditRequest,
    payload: { student, id },
  };
}

export function editSuccess(student) {
  return {
    type: constants.studentsEditSuccess,
    payload: { student },
  };
}

export function removeRequest(id) {
  return {
    type: constants.studentsRemoveRequest,
    payload: { id },
  };
}

export function removeSuccess(students) {
  return {
    type: constants.studentsRemoveSuccess,
    payload: { students },
  };
}

export function studentFalure() {
  return {
    type: constants.studentsFailure,
  };
}
