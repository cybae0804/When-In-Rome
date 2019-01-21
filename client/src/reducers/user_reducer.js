import types from '../actions/types';

const DEFAULT_STATE = {
  user: {},
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return { ...state, user: action.user };
    case types.SIGN_OUT:
      return { ...state, user: {} };
    default:
      return state;
  }
}
