import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';

import ConnectedEditBookModal, { EditBookModal } from
  '../../../../src/app/components/presentation/common/modal/EditBookModal';

const nextBook = {
  book: {
    title: 'Nextprop title',
    author: 'Nextprop author',
    description: 'This is a good descriptionnnnnnn',
    bookImage: 'book Image',
    imageName: 'book Image',
    quantity: '2'
  }
};

const book = {
  title: 'Another title',
  author: 'Another author',
  description: 'This is a good descriptionnnnnnn',
  bookImage: 'book Image',
  imageName: 'book Image',
  quantity: '2'
};

const props = {
  updateBookDetails: jest.fn(() => Promise.resolve({ response: '' })),
  header: '',
  book
};

const store = mockStore({
  bookReducer: {
    book,
  }
});

const setup = () => shallow(<EditBookModal {...props}/>);


describe('<EditBook Component', () => {
  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Modal').length).toBe(1);
    expect(wrapper.find('BookDetailForm').length).toBe(1);
  });
  it('should call the onChange method ', () => {
    const wrapper = setup();
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    const event = {
      preventDefault: jest.fn(),
      target: {
        title: 'This title',
        author: 'This author',
        description: 'This is a good descriptionnnnnnn',
        bookImage: 'book Image',
        imageName: 'book Image',
        quantity: '2'
      }
    };
    wrapper
      .instance()
      .onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the componentWillReceiveProps method' +
  'and open new book by setting it in state', () => {
    const wrapper = setup();
    const componentWillReceivePropsSpy =
    jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper
      .instance()
      .componentWillReceiveProps(nextBook);
    expect(wrapper.state().title).
      toEqual('Nextprop title');
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the handleSubmit method ', () => {
    const wrapper = setup();

    const title = 'This title';
    const author = 'Thbbbb';
    const description = 'This is a good description';
    const quantity = '4';

    wrapper.setState({
      title, author, description, quantity
    });
    const handleSubmitSpy = jest
      .spyOn(wrapper.instance(), 'handleSubmit');
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the handleSubmit method and set an error state' +
  'if there is an error with validation', () => {
    const wrapper = setup();

    const title = 'This title';
    const author = 'Benny';
    const description = 'Error';
    const quantity = '4';

    wrapper.setState({
      title, author, description, quantity
    });
    const handleSubmitSpy = jest
      .spyOn(wrapper.instance(), 'handleSubmit');
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().errors.description).
      toEqual('The book description should be between 10 and 300.');
  });
});


describe('<Authentication Wrapper', () => {
  const connectedSetup = () => shallow(<ConnectedEditBookModal
    {...props}
    store={store} />);

  it('renders without crashing', () => {
    const wrapper = connectedSetup();
    expect(wrapper.length).toBe(1);
  });
});

