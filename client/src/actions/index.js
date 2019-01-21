import axios from 'axios';
import types from './types';

const EXPERIENCES_ROUTE = '/api/experiences';

export function getExperienceDetails(id) {
  return async dispatch => {
    try {
      const { data: { experience } } = await axios.get(`${EXPERIENCES_ROUTE}/${id}`);
      
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
      let narrowDownQuery = '';

      for (let param in parameters){
        if (parameters[param]) narrowDownQuery += `${param}=${parameters[param]}&`; 
      }

      const l = narrowDownQuery.length;
      if (narrowDownQuery[l-1] === '&'){
        narrowDownQuery = narrowDownQuery.substring(0, l-1);
      }

      const { data: { experiences } } = await axios.get(`${EXPERIENCES_ROUTE}?${narrowDownQuery}`);

      dispatch({
        type: types.GET_EXPERIENCES,
        payload: experiences,
      });
    } catch (err) {
      console.log('getExperiences Error', err);
    }
  }
}

export function getCreatedExperiences() {
  return async dispatch => {
    try {
      const { data: { experiences } } = await axios.get(EXPERIENCES_ROUTE);

      dispatch({
        type: types.GET_CREATED_EXPERIENCES,
        payload: experiences,
      });
    } catch (err) {
      console.log('getCreatedExperiences Error:', err);
    }
  }
}

export function postExperience(parameters, image) {
  return async dispatch => {
    try {
      dispatch({ type: types.IMAGE_UPLOAD_START });

      const s3UploadConfig = await axios.get(`/api/prep-upload?fileType=${image.type}&name=${image.name}`);

      const { url, key } = s3UploadConfig.data;

      await axios.put(url, image, {
        headers: {
          'Content-Type': image.type
        }
      });

      parameters.imagePath = key;

      const { data: { success } } = await axios.post(EXPERIENCES_ROUTE, 
        parameters,
      );

      dispatch({ type: types.IMAGE_UPLOAD_COMPLETE });

      dispatch({
        type: types.POST_EXPERIENCE,
        payload: success,
      });
    } catch (err) {
      console.log('postExperience Error', err);
    }
  }
}

export function resetImageUpload() {
  return { 
    type: types.IMAGE_UPLOAD_RESET 
  }
};

export function putExperience(parameters) {
  return async dispatch => {
    try {
      const { id } = parameters;
      const { data: { success } } = await axios.put(`${EXPERIENCES_ROUTE}/${id}`,
        parameters,
      );

      dispatch({
        type: types.PUT_EXPERIENCE,
        payload: success,
      });
    } catch (err) {
      console.log('putExperience Error', err);
    }
  }
}

export function getHostBookedDates() {
  return async dispatch => {
    try {
      const { data: { dates } } = await axios.get()
      dispatch({
        type: types.GET_HOST_BOOKED_DATES,
        payload: dates,
      });
    } catch(err) {
      console.log('getHostBookedDates Error', err);
    }
  }
}

export function getUser(){
  return async dispatch => {
    try {
      const resp = await axios.get('/oauth/user');
      // dispatch user info and signIN type
      console.log('Get User Resp:', resp);

      return true;
    } catch(err){
      console.log('Get User Error:', err);
      // sign in error
      
      return false;
    }
  }
}
