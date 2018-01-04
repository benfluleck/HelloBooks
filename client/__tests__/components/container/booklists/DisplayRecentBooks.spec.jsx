import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedDisplayRecentBooks, { DisplayRecentBooks } from
  '../../../../src/app/components/container/booklist/DisplayRecentBooks';


const recentBooks = [{
  id: 9,
  title: 'Test Title',
  author: 'Test author',
  description: 'Test description',
  bookImage: 'bbnn/dfdfd/gfgfg',

},
{
  id: 10,
  title: 'Test Title1',
  author: 'Test author1',
  description: 'Test description',
  bookImage: 'bbnn/dfdfd/gfgfg',

}];

const props = {
  offset: 0,
  limit: 3,
  fetchAllRecentBooks: jest.fn(() => Promise.resolve()),
  fetchAllBorrowedBooks: jest.fn(() => Promise.resolve()),
  recentBooks

};

const store = mockStore({
  userReducer: {
    user: {
      isAdmin: true
    }
  },
  bookReducer: {

    recentBooksList: recentBooks
  }

});


describe('<DisplayAllRecentBooks', () => {
  const setup = () => shallow(<DisplayRecentBooks {...props} />);
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('Row').length).toBe(1);
    expect(wrapper.find('.recent-books').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
});


describe('<DisplayAllRecentBook', () => {
  const setup = () =>
    shallow(<ConnectedDisplayRecentBooks store={store} {...props} />);
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
});
