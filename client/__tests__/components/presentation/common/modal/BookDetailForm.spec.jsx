import React from 'react';
import { shallow } from 'enzyme';

import BookDetalForm from
  '../../../../../src/app/components/presentation/common/modal/BookDetailForm.jsx';


const book = {
  title: 'Test Title',
  author: 'Test author',
  description: 'Test description',
  bookImage: 'bbnn/dfdfd/gfgfg',
  imageName: 'Test Image',
};

const props = {
  book,
  errors: {},
  onChange: () => {}
};

describe('<BookDetail Component', () => {
  const setup = () => shallow(<BookDetalForm {...props}/>);

  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('TextInput').length).toBe(4);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
});
