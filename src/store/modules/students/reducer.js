import produce from 'immer';
import constants from './constants';

const INITIAL_STATE = {
  student: {},
  students: [],
  loading: false,
};

export default function students(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case constants.studentsLoadRequest: {
        draft.loading = true;
        break;
      }
      case constants.studentsLoadSuccess: {
        draft.students = action.payload.students;
        draft.loading = false;
        break;
      }
      case constants.studentsRegisterRequest: {
        draft.loading = true;
        break;
      }
      case constants.studentsRegisterSuccess: {
        draft.student = action.payload.student;
        draft.loading = false;
        break;
      }
      case constants.studentsEditRequest: {
        draft.loading = true;
        break;
      }
      case constants.studentsEditSuccess: {
        draft.student = action.payload.student;
        draft.loading = false;
        break;
      }
      case constants.studentsRemoveRequest: {
        draft.loading = true;
        break;
      }
      case constants.studentsRemoveSuccess: {
        draft.students = action.payload.students;
        draft.loading = false;
        break;
      }
      case constants.studentsFailure: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
