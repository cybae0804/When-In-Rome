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
      const { cityjob, date, guests } = parameters;
      
      const { data: { experiences } } = await axios.get(`${EXPERIENCES_ROUTE}?cityjob=${cityjob}&date=${date}&guests=${guests}`);

      dispatch({
        type: types.GET_EXPERIENCES,
        payload: experiences,
      });
    } catch (err) {
      console.log('getExperiences Error', err);
    }
  }
}

export function postExperience(parameters) {
  return async dispatch => {
    try {
      console.log(EXPERIENCES_ROUTE);
      const { data: { success } } = await axios.post('http://localhost:9000/api/experiences', {
        parameters,
      });

      dispatch({
        type: types.POST_EXPERIENCE,
        payload: success,
      });
    } catch (err) {
      console.log('postExperience Error', err);
    }
  }
}

export const getImages = () => async dispatch => {
  const { data: { images } } = await axios.get('/api/get-images');

  dispatch({
    type: types.GET_IMAGES,
    images
  });
}

export const resetImageUpload = () => ({ type: types.IMAGE_UPLOAD_RESET });

export const uploadImage = (details, image) => async dispatch => {
  try {
    dispatch({ type: types.IMAGE_UPLOAD_START });

    const s3UploadConfig = await axios.get(`/api/prep-upload?fileType=${image.type}&name=${image.name}`);
    
    const { url, key } = s3UploadConfig.data;
    
    await axios.put(url, image, {
      headers: {
        'Content-Type': image.type
      }
    });

    await axios.post('/api/save-image', {
      ...details,
      path: key,
    });

    dispatch({ type: types.IMAGE_UPLOAD_COMPLETE });
  } catch (err) {
    console.log('Error Uploading Image to S3', err);
  }
}
