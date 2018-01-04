import React from 'react';
import { shallow } from 'enzyme';
/* eslint-disable */
import MessageforNoCatBooks from
  '../../../../src/app/components/presentation/messages/dashboardMessages/MessageforNoCatBooks';


describe('MessageforNoBooks/>', () => {
  it('renders a MessageforNoBooks without crashing', () => {
    const setup = () => shallow(<MessageforNoCatBooks />);
    const wrapper = setup();
    expect(wrapper.find('Row').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
});
