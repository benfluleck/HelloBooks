import React from 'react';
import { shallow } from 'enzyme';

import { SearchBooks } from
  '../../../../src/app/components/presentation/common/book/SearchBooks.jsx';


const props = {
  offset: 0,
  limit: 3,
  searchAllBooks: jest.fn(() => Promise.resolve()),
  fetchAllBooks: jest.fn(() => Promise.resolve()),
};

const setup = () => shallow(<SearchBooks {...props}/>);


describe('<SearchBooks', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('Autocomplete').length).toBe(1);
    expect(wrapper.find('.autocomplete').length).toBe(1);
  });
  it('should call the onChange method when the searchItem ' +
  'value is greater than 1', () => {
    const wrapper = setup();
    const event = {};
    const value = "Redt";
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper
      .instance()
      .onChange(event, value);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the onChange method when the searchItem ' +
  'value is empty', () => {
    const wrapper = setup();
    const event = {};
    const value = "";
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper
      .instance()
      .onChange(event, value);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
});
