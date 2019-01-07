import types from '../actions/types';

const DEFAULT_STATE = {
  details: {
    id: '', 
    image: '', 
    activity: '', 
    occupation: '', 
    city: '', 
    country: '', 
    price: '', 
    guests: '', 
    host: '', 
    host_Info: '', 
    activity_info: '', 
    duration: '', 
    reviews: '', 
    average_rating: '', 
    total_ratings: '',
  },
};

function experienceReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case types.GET_EXPERIENCE:
      return { 
        ...state, 
        details: action.payload,
      };
    default:
      return state;
  }
};

export default experienceReducer;
