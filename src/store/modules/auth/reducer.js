import produce from 'immer';
import constants from './constants';

const INITIAL_STATE = {
  token: null,
  signed: false,
  user: {},
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case constants.authSignInRequest: {
        draft.loading = true;
        break;
      }
      case constants.authSignInSuccess: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.user = action.payload.user;
        draft.loading = false;
        break;
      }
      case constants.authSignOut: {
        draft.token = null;
        draft.signed = false;
        draft.user = {};
        break;
      }
      case constants.authSignFailure: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
