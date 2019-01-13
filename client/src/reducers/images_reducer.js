import types from '../actions/types';

const DEFAULT_STATE = {
  all: [],
  uploadStatus: null
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.GET_IMAGES:
      return { ...state, all: action.images };
    case types.IMAGE_UPLOAD_COMPLETE:
      return { ...state, uploadStatus: 'complete' };
    case types.IMAGE_UPLOAD_RESET:
      return { ...state, uploadStatus: null };
    case types.IMAGE_UPLOAD_START:
      return { ...state, uploadStatus: 'in-progress' };
    default:
      return state;
  }
}
