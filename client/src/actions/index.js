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

export function getExperiences() {
  return async dispatch => {
    try {
      const { data: { experiences } } = await axios.get(GET_EXPERIENCES);

      dispatch({
        type: types.GET_EXPERIENCES,
        payload: experiences,
      });
    } catch (err) {
      console.log('getExperiences Error', err);
    }
  }
}
