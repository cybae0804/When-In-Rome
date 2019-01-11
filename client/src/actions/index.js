import axios from 'axios';
import types from './types';

const GET_EXPERIENCES = '/api/experiences';

export function getExperienceDetails(id) {
  return async dispatch => {
    try {
      const { data: { experience } } = await axios.get(`${GET_EXPERIENCES}/${id}`);
      
      dispatch({
        type: types.GET_EXPERIENCE_DETAILS,
        payload: experience,
      });
    } catch(err) {
      console.log('getExperienceDetails Error:', err);
    }
  }
}

export function getExperiences(parameters) {
  return async dispatch => {
    try {
      const { cityjob, date, guests } = parameters;
      console.log(`${GET_EXPERIENCES}?cityjob=${cityjob}&date=${date}&guests=${guests}`);
      const { data: { experiences } } = await axios.get(`${GET_EXPERIENCES}?cityjob=${cityjob}&date=${date}&guests=${guests}`);

      dispatch({
        type: types.GET_EXPERIENCES,
        payload: experiences,
      });
    } catch (err) {
      console.log('getExperiences Error', err);
    }
  }
}
