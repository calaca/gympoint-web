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

export function editRequest(plan, id) {
  return {
    type: constants.plansEditRequest,
    payload: {
      plan,
      id,
    },
  };
}

export function editSuccess(plan) {
  return {
    type: constants.plansEditSuccess,
    payload: { plan },
  };
}

export function removeRequest(id) {
  return {
    type: constants.plansRemoveRequest,
    payload: { id },
  };
}

export function removeSuccess(plans) {
  return {
    type: constants.plansRemoveSuccess,
    payload: { plans },
  };
}

export function planFailure() {
  return {
    type: constants.plansFailure,
  };
}
