import request from 'superagent';
import { showErrorNotification } from './notifications';


import { UPLOAD_TO_CLOUD_IMAGE_SUCCESS,
  UPLOAD_TO_CLOUD_IMAGE_FAILURE,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL } from './actiontype';

export const UploadImageToCloud = response =>
  ({
    type: UPLOAD_TO_CLOUD_IMAGE_SUCCESS,
    response
  });
export const UploadImageToCloudFailure = error =>
  ({
    type: UPLOAD_TO_CLOUD_IMAGE_FAILURE,
    error
  });

/**
 * @description Image upload to cloudinary
 *
 * @param {param} username
 *
 * @param {param} imageData
 *
 * @returns {object} response
 */
export const imageUploadToCloud = (username, imageData) => dispatch => request
  .post(CLOUDINARY_UPLOAD_URL)
  .field({ upload_preset: CLOUDINARY_UPLOAD_PRESET })
  .field('file', imageData)
  .field('public_id', `${username}`)
  .then((response) => {
    dispatch(UploadImageToCloud(response.body));
    return (response.body);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    UploadImageToCloudFailure(error);
  });
