import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import experience from './experience_reducer';
import images from './images_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
  experience,
  images,
  form,
  user,
});

export default rootReducer;
