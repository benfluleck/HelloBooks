import React from 'react';
import { shallow } from 'enzyme';

import SiteFooter from
  '../../../../src/app/components/presentation/common/Footer.jsx';

const props = {};


describe('Footer Component', () => {
  const setup = () => shallow(<SiteFooter {...props} />);

  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Footer')).toHaveLength(1);
  });
});
