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

export function registerRequest(title, duration, price) {
  return {
    type: constants.plansRegisterRequest,
    payload: {
      title,
      duration,
      price,
    },
  };
}

export function registerSuccess(plan) {
  return {
    type: constants.plansRegisterSuccess,
    payload: { plan },
  };
}

export function planFailure() {
  return {
    type: constants.plansFailure,
  };
}
