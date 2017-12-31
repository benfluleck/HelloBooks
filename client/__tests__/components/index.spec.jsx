import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/app/index.jsx';


describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeDefined();
  });

  it('renders the MainRoot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Main').length).toBe(1);
  });
});
