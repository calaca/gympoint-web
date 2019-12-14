import constants from './constants';

export function loadRequest() {
  return {
    type: constants.helpOrdersLoadRequest,
  };
}

export function loadSuccess(helpOrders) {
  return {
    type: constants.helpOrdersLoadSuccess,
    payload: { helpOrders },
  };
}

export function answerRequest(answer, id) {
  return {
    type: constants.helpOrdersAnswerRequest,
    payload: { answer, id },
  };
}

export function answerSuccess(helpOrder) {
  return {
    type: constants.helpOrdersAnswerSuccess,
    payload: { helpOrder },
  };
}

export function helpOrderFailure() {
  return {
    type: constants.helpOrdersFailure,
  };
}
