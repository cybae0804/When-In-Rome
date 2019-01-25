import types from '../actions/types';

const DEFAULT_STATE = {
  auth: false,
  user: {},
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return { ...state, auth: true,  user: action.user };
    case types.SIGN_OUT:
      return { ...state, auth: false, user: {} };
    default:
      return state;
  }
}
