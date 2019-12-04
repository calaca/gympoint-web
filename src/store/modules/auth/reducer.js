import produce from 'immer';
import constants from './constants';

const INITIAL_STATE = {
  token: null,
  signed: false,
  user: {},
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.authSignInSuccess:
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.user = action.payload.user;
      });
    default:
      return state;
  }
}
