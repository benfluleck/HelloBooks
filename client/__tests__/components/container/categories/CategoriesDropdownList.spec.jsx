import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { CategoriesDropdown } from
  '../../../../src/app/components/container/categories/CategoriesDropdownList';


const setup = () => {
  const props = {
    categories: [{ id: 1, categoryName: "Action" },
      { id: 2, categoryName: "Drama" }],
    onClick: () => {},
  };

  return shallow(<CategoriesDropdown {...props} />);
};

describe('CategoriesDropdown Component', () => {
  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper.find('Dropdown').length).toBe(1);
    expect(wrapper.find('NavItem').length).toBe(2);
  });
});
