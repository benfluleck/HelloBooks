import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../../__mocks__/mockConfig';
import ConnectedDisplayBookModal, { DisplayBookModal } from
  '../../../../../src/app/components/presentation/common/book/DisplayBookModal';
import BaseBookModal from
  '../../../../../src/app/components/presentation/common/book/BaseBookModal';

const book = {
  id: 9,
  title: 'Test Title',
  author: 'Test author',
  description: 'Test description',
  bookImage: 'bbnn/dfdfd/gfgfg'
};

const books = {
  id: 9,
  title: 'Test Title',
  author: 'Test author',
  description: 'Test description',
  bookImage: 'bbnn/dfdfd/gfgfg'
};

const borrowedBooksList = {
  books: [{
    book
  }]
};


const props = {
  book,
  borrowBookAction: jest.fn(() => Promise.resolve({ response: "" })),
  returnBookAction: jest.fn(() => Promise.resolve()),
  isAuthenticated: true,
  borrowedBooksList,
  header: '',
  books,
  actions: <div />,

};

let date;

describe('<DisplayBookModal', () => {
  const setup = () => shallow(<DisplayBookModal {...props}/>);
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('BaseBookModal').length).toBe(1);
    expect(wrapper.find('.book-modal').length).toBe(1);
  });
  it('should call the handleChange method', () => {
    const wrapper = setup();
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange(date);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the onChange method', () => {
    const wrapper = setup();
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange(date);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the handleReturnClick method', () => {
    const wrapper = setup();
    const handleReturnClickSpy =
    jest.spyOn(wrapper.instance(), 'handleReturnClick');
    wrapper.instance().handleReturnClick();
    expect(handleReturnClickSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the handleBorrowClick method', () => {
    const wrapper = setup();
    const handleBorrowClickSpy =
    jest.spyOn(wrapper.instance(), 'handleBorrowClick');
    wrapper.instance().handleBorrowClick();
    expect(handleBorrowClickSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the handleBorrowClick method with a response error', () => {
    const wrapper = setup();
    wrapper.setProps({
      borrowBookAction: jest.fn(() =>
        Promise.resolve({ error: '' }))
    });
    const handleBorrowClickSpy =
    jest.spyOn(wrapper.instance(), 'handleBorrowClick');
    wrapper.instance().handleBorrowClick();
    expect(handleBorrowClickSpy).toHaveBeenCalledTimes(1);
  });
});

describe('<Connected DisplayBookModal', () => {
  const store = mockStore({
    userReducer: {
      user: {
        isAuthenticated: true
      }
    },
    bookReducer: {
      borrowedBooksList: {
        books: [{
          books
        }]
      },
      book: {
        books
      }
    }
  });
  const setup = () =>
    shallow(<ConnectedDisplayBookModal store={store} {...props}/>);
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
});

describe('<BaseBookModal', () => {
  const setup = () => shallow(<BaseBookModal {...props}/>);
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('Modal').length).toBe(1);
    expect(wrapper.find('.book-modal').length).toBe(4);
    expect(wrapper.find('#modal').length).toBe(1);
  });
  it('renders without crashing if Authenticated is false', () => {
    const wrapper = setup();
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper.find('Modal').length).toBe(1);
    expect(wrapper.find('.book-modal').length).toBe(4);
    expect(wrapper.find('#modal').length).toBe(1);
  });
});
