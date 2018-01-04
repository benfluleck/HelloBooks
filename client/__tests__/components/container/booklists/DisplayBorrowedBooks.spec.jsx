import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedDisplayBorrowedBooks, { DisplayAllBorrowedBooks } from
  '../../../../src/app/components/container/booklist/DisplayBorrowedBooks';

const book = {
  id: 9,
  title: 'Test Title',
  author: 'Test author',
  description: 'Test description',
  bookImage: 'bbnn/dfdfd/gfgfg',
};

const borrowedBooks = {
  books: [{
    book

  }],
  pagination: {
    page: 1,
    pageCount: 2,
    pageSize: 8,
    totalCount: 14
  }
};

const props = {
  offset: 0,
  limit: 3,
  key: book.id,
  fetchAllBorrowedBooks: jest.fn(() => Promise.resolve()),
  borrowedBooks

};

const store = mockStore({
  userReducer: {
    user: {
      isAdmin: true
    }
  },
  bookReducer: {

    borrowedBooksList: borrowedBooks
  }

});


describe('<DisplayAllBooks', () => {
  const setup = () => shallow(<DisplayAllBorrowedBooks {...props} />);
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('PaginationWrapper').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
  it('renders when there are no borrowed books' +
   'in props and renders a message', () => {
    const wrapper = setup();
    wrapper.setProps({
      borrowedBooks: { books: [] },
      pagination: { page: 1, pageCount: 1 }

    });
    expect(wrapper.find('MessageforNoBooks').length).toBe(1);
  });
});


describe('<DisplayAllBorrowedBooks', () => {
  const setup = () =>
    shallow(<ConnectedDisplayBorrowedBooks store={store} {...props} />);
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
});
