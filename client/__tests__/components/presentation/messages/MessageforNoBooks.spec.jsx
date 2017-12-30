import React from 'react';
import { shallow } from 'enzyme';
import MessageforNoBooks from
  '../../../../src/app/components/presentation/messages/dashboardMessages/MessageforNoBooks.jsx';


describe('MessageforNoBooks/>', () => {
  it('renders a MessageforNoBooks without crashing', () => {
    const setup = () => shallow(<MessageforNoBooks />);
    const wrapper = setup();
    expect(wrapper.find('Row').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
});
