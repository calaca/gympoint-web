import produce from 'immer';
import constants from './constants';

const INITIAL_STATE = {
  plan: {},
  plans: [],
  loading: false,
};

export default function plans(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case constants.plansLoadRequest: {
        draft.loading = true;
        break;
      }
      case constants.plansLoadSuccess: {
        draft.plans = action.payload.plans;
        draft.loading = false;
        break;
      }
      case constants.plansRegisterRequest: {
        draft.loading = true;
        break;
      }
      case constants.plansRegisterSuccess: {
        draft.plan = action.payload.plan;
        draft.loading = false;
        break;
      }
      case constants.plansEditRequest: {
        draft.loading = true;
        break;
      }
      case constants.plansEditSuccess: {
        draft.plan = action.payload.plan;
        draft.loading = false;
        break;
      }
      case constants.plansFailure: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
