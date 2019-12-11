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

export function registerRequest(student_id, plan_id, start_date) {
  return {
    type: constants.enrollmentsRegisterRequest,
    payload: {
      student_id,
      plan_id,
      start_date,
    },
  };
}

export function registerSuccess(enrollment) {
  return {
    type: constants.enrollmentsRegisterSuccess,
    payload: { enrollment },
  };
}

export function enrollmentFailure() {
  return {
    type: constants.enrollmentsFailure,
  };
}
