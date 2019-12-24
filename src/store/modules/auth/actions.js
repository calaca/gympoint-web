import constants from './constants';

export function signInRequest(email, password) {
  return {
    type: constants.authSignInRequest,
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: constants.authSignInSuccess,
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: constants.authSignFailure,
  };
}
