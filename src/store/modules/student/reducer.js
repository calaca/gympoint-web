import produce from 'immer';
import constants from './constants';

const INITIAL_STATE = {
  student: {},
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case constants.studentRegisterRequest: {
        draft.loading = true;
        break;
      }
      case constants.studentRegisterSuccess: {
        draft.student = action.payload.student;
        draft.loading = false;
        break;
      }
      case constants.studentFailure: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
