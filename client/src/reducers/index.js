import { combineReducers } from 'redux';
import experience from './experience_reducer';
import images from './images_reducer';

const rootReducer = combineReducers({
  experience,
  images,
});

export default rootReducer;
