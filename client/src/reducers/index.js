import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import experience from './experience_reducer';
import images from './images_reducer';

const rootReducer = combineReducers({
  experience,
  images,
  form,
});

export default rootReducer;
