import React from 'react';
import { shallow, mount } from 'enzyme';

import { mockStore } from '../../../../__mocks__/mockConfig';
import ConnectedBook, { Book } from
  '../../../../../src/app/components/presentation/common/book/DisplayBook';

const book = {
  id: 9,
  title: 'Test Title',
  author: 'Test author',
  description: 'Test description',
  bookImage: 'bbnn/dfdfd/gfgfg'
};


const props = {
  book,
  offset: 0,
  limit: 3,
  fetchSelectedBook: jest.fn(() => Promise.resolve()),
  deleteBookAction: jest.fn(() => Promise.resolve()),
  fetchAllBooks: jest.fn(() => Promise.resolve()),

  isAdmin: true

};

jest.mock('sweetalert2', () => jest.fn(() => Promise.resolve({})));

const store = mockStore({
  userReducer: {
    user: {
      isAdmin: true
    }
  },
  bookReducer: {
    books: {
      books: [{
        book
      }]
    }
  }
});

const setup = () => shallow(<Book {...props}/>);

describe('<DisplayBook', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('ReactTooltip').length).toBe(1);
  });
  it('should call the handleEdit method', () => {
    const wrapper = setup();
    const handleEditSpy = jest.spyOn(wrapper.instance(), 'handleEdit');
    wrapper
      .instance()
      .handleEdit(book);
    expect(handleEditSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the handleBook method', () => {
    const wrapper = setup();
    const handleBookClickSpy =
    jest.spyOn(wrapper.instance(), 'handleBookClick');
    wrapper
      .instance()
      .handleBookClick(book);
    expect(handleBookClickSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the handleDelete method with a Successful Delete', () => {
    const wrapper = setup();
    const handleDeleteSpy = jest.spyOn(wrapper.instance(), 'handleDelete');
    wrapper
      .instance()
      .handleDelete(book.id);
    expect(handleDeleteSpy).toHaveBeenCalledTimes(1);
  });
});

describe('<Connected Book', () => {
  const connectedBookSetup = () =>
    mount(<ConnectedBook {...props} store={store}/>);
  const wrapper = connectedBookSetup();
  it('renders without crashing', () => {
    expect(wrapper.find('.btn-floating').length).toBe(2);
    expect(wrapper.find('.edit-btn-class').length).toBe(1);
    expect(wrapper.find('.delete-book-btn').length).toBe(1);
  });
});

