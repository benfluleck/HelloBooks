import { mock, mockStore } from '../../__mocks__/mockConfig';

import {UPLOAD_TO_CLOUD_IMAGE_FAILURE,
  UPLOAD_TO_CLOUD_IMAGE_SUCCESS,
  imageUploadToCloud,
} from '../../../src/app/actions/index';


import mockItems from '../../__mocks__/mockItems';

describe('Upload Image action', () => {
  // test('should successfully rsearch all books', () => {
  //   const store = mockStore({ allBooksList: { } });
  //   mock.onGet().replyOnce(
  //     200,
  //     { booksFound: mockItems.booksFound }
  //   );
  //   store.dispatch(searchAllBooks('Cap'))
  //     .then(() => store.getActions())
  //     .then((actions) => {
  //       expect(actions.length).toBe(1);
  //       expect(actions[0].type).toBe(SEARCH_BOOKS_SUCCESS);
  //     });
  // });
  test('should return an error when userdata not psecified for image', () => {
    const errorMessage = 'Image Upload failed';
    const store = mockStore({ });

    mock.onGet().replyOnce(
      404,
      { body: mockItems.user }
    );
    store.dispatch(imageUploadToCloud(mockItems.user.username, mockItems.imageData))
      .then(() => store.getActions())
      .then((error) => {
        console.log(error,'>>>>>GG>G>G');
      });
  });
});
