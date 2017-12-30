import React from 'react';
import { shallow } from 'enzyme';
import Loader from
  '../../../../src/app/components/container/booklist/Loader.jsx';


describe('Loader/>', () => {
  it('renders a Preloader with no records in props', () => {
    const props = {
    };
    const setup = () => shallow(<Loader {...props} />);
    const wrapper = setup();
    expect(wrapper.find('Preloader').length).toBe(1);
  });
  it('renders a with records defined', () => {
    const props = {
      records: {},
      callback: jest.fn()
    };
    const setup = () => shallow(<Loader {...props} />);
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
});
