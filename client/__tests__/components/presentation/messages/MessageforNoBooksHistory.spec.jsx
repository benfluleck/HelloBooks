import React from 'react';
import { shallow } from 'enzyme';
import MessageforNoBooksHistory from
  '../../../../src/app/components/presentation/messages/dashboardMessages/MessageforNoBooksHistory';


describe('MessageforNoBooks/>', () => {
  it('renders a MessageforNoBooksHistory without crashing', () => {
    const setup = () => shallow(<MessageforNoBooksHistory />);
    const wrapper = setup();
    expect(wrapper.find('Row').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
});
