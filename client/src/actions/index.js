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

export function postExperiences(parameters) {
  
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
