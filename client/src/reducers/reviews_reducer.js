import types from '../actions/types';

const DEFAULT_STATE = {
  status: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.POST_REVIEW:
      return { ...state, status: action.type };
    default:
      return state;
  }
}
