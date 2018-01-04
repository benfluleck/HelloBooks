import { mock, mockStore } from '../../__mocks__/mockConfig';

import {
  imageUploadToCloud,
} from '../../../src/app/actions/index';


import mockItems from '../../__mocks__/mockItems';

describe('Upload Image action', () => {
  test('should successfully upload a user Image', () => {
    const store = mockStore({ });
    mock.onPost().replyOnce(
      200,
      { body: mockItems.user }
    );
    store.dispatch(imageUploadToCloud(
      mockItems.user.username,
      mockItems.imageData
    ))
      .then(() => store.getActions())
      .then((actions) => {
      });
  });
  test('should return an error when userdata not psecified for image', () => {
    const store = mockStore({ });

    mock.onPost().replyOnce(
      404,
      { body: mockItems.user }
    );
    store.dispatch(imageUploadToCloud(
      mockItems.user.username,
      mockItems.imageData
    ))
      .then(() => store.getActions())
      .then((error) => {
      });
  });
});
