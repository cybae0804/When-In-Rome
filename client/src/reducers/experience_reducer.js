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
    images: [],
  },
  experiences: [],
  success: null,
};

function experienceReducer(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case types.GET_EXPERIENCE_DETAILS:
      return { ...state, details: action.payload };
    case types.CLEAR_EXPERIENCE_DETAILS:
      return DEFAULT_STATE;
    case types.GET_EXPERIENCES:
      return { ...state, experiences: action.payload };
    case types.POST_EXPERIENCE:
      return { ...state, success: action.payload };
    case types.PUT_EXPERIENCE:
      return { ...state, success: action.payload };
    default:
      return state;
  }
};

export default experienceReducer;
