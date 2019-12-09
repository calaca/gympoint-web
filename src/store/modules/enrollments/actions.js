import constants from './constants';

export function loadRequest() {
  return {
    type: constants.enrollmentsLoadRequest,
  };
}

export function loadSuccess(enrollments) {
  return {
    type: constants.enrollmentsLoadSuccess,
    payload: { enrollments },
  };
}

export function enrollmentFailure() {
  return {
    type: constants.enrollmentsFailure,
  };
}
