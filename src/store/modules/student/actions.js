import constants from './constants';

export function registerRequest(name, email, age, weight, height) {
  return {
    type: constants.studentRegisterRequest,
    payload: { name, email, age, weight, height },
  };
}

export function registerSucces(student) {
  return {
    type: constants.studentRegisterSuccess,
    payload: { student },
  };
}

export function editRequest(student, id) {
  return {
    type: constants.studentEditRequest,
    payload: { student, id },
  };
}

export function editSuccess(student) {
  return {
    type: constants.studentEditSuccess,
    payload: { student },
  };
}

export function studentFalure() {
  return {
    type: constants.studentFailure,
  };
}
