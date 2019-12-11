import produce from 'immer';
import constants from './constants';

const INITIAL_STATE = {
  enrollment: {},
  enrollments: [],
  loading: false,
};

export default function enrollments(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case constants.enrollmentsLoadRequest: {
        draft.loading = true;
        break;
      }
      case constants.enrollmentsLoadSuccess: {
        draft.enrollments = action.payload.enrollments;
        draft.loading = false;
        break;
      }
      case constants.enrollmentsRegisterRequest: {
        draft.loading = true;
        break;
      }
      case constants.enrollmentsRegisterSuccess: {
        draft.enrollment = action.payload.enrollment;
        draft.loading = false;
        break;
      }
      case constants.enrollmentsFailure: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
