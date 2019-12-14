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

export function editRequest(enrollment, id) {
  return {
    type: constants.enrollmentsEditRequest,
    payload: {
      enrollment,
      id,
    },
  };
}

export function editSuccess(enrollment) {
  return {
    type: constants.enrollmentsEditSuccess,
    payload: { enrollment },
  };
}

export function removeRequest(id) {
  return {
    type: constants.enrollmentsRemoveRequest,
    payload: { id },
  };
}

export function removeSuccess(enrollments) {
  return {
    type: constants.enrollmentsRemoveSuccess,
    payload: { enrollments },
  };
}

export function enrollmentFailure() {
  return {
    type: constants.enrollmentsFailure,
  };
}
