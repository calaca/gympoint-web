import produce from 'immer';
import constants from './constants';

const INITIAL_STATE = {
  helpOrders: [],
  loading: false,
};

export default function helpOrders(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case constants.helpOrdersLoadRequest: {
        draft.loading = true;
        break;
      }
      case constants.helpOrdersLoadSuccess: {
        draft.helpOrders = action.payload.helpOrders;
        draft.loading = false;
        break;
      }
      case constants.helpOrdersAnswerRequest: {
        draft.loading = true;
        break;
      }
      case constants.helpOrdersAnswerSuccess: {
        draft.helpOrders = state.helpOrders.filter(
          ho => ho.id !== action.payload.helpOrder.id
        );
        draft.loading = false;
        break;
      }
      case constants.helpOrdersFailure: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
