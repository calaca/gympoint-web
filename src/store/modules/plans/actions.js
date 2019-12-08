import constants from './constants';

export function loadRequest() {
  return {
    type: constants.plansLoadRequest,
  };
}

export function loadSuccess(plans) {
  return {
    type: constants.plansLoadSuccess,
    payload: { plans },
  };
}

export function planFailure() {
  return {
    type: constants.plansFailure,
  };
}
