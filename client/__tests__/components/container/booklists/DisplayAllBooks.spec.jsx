import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedDisplayAllBooks, { DisplayAllBooks } from
  '../../../../src/app/components/container/booklist/DisplayAllBooks';

const book = {
  id: 9,
  title: 'Test Title',
  author: 'Test author',
  description: 'Test description',
  bookImage: 'bbnn/dfdfd/gfgfg',
};

const allBooksList = {
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
  fetchAllBooks: jest.fn(() => Promise.resolve()),
  fetchAllCategories: jest.fn(() => Promise.resolve()),

  allBooksList

};

const store = mockStore({
  userReducer: {
    user: {
      isAdmin: true
    }
  },
  bookReducer: {

    allBooksList
  }

});


describe('<DisplayAllBooks', () => {
  const setup = () => shallow(<DisplayAllBooks {...props} />);
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('PaginationWrapper').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
  it('renders when there are no books in props', () => {
    const wrapper = setup();
    wrapper.setProps({ allBooksList: {} });
    expect(wrapper.length).toBe(1);
  });
});


describe('<DisplayAllBooks', () => {
  const setup = () =>
    shallow(<ConnectedDisplayAllBooks store={store} {...props} />);
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
});
