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

export const uploadImage = (name, image) => async dispatch => {
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
      name,
      path: key,
    });

    dispatch({ type: types.IMAGE_UPLOAD_COMPLETE });
  } catch (err) {
    console.log('Error Uploading Image to S3', err);
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
