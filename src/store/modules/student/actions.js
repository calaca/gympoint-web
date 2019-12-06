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

export function registerFailure() {
  return {
    type: constants.studentRegisterFailure,
  };
}
