import axios from 'axios';
import types from './types';

export function getExperience() {
  return async dispatch => {
    try {
      const { data: { experience } } = await axios.get('api/experiences/1');
      
      dispatch({
        type: types.GET_EXPERIENCE,
        payload: experience,
      });
    } catch(err) {
      console.log('getExperience Error:', err);
    }
  }
}

