import { combineReducers } from 'redux';
import experienceReducer from './experience_reducer';
import searchReducer from './search_reducer';

const rootReducer = combineReducers({
  // experience: experienceReducer,
  // search: searchReducer,
});

export default rootReducer;
