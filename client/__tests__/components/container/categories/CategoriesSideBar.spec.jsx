import React from 'react';
import { shallow } from 'enzyme';

import { CategoriesSideBar } from
  '../../../../src/app/components/container/categories/CategoriesSideBarList';


const setup = () => {
  const props = {
    categories: [{ id: 1, categoryName: "Action" },
      { id: 2, categoryName: "Drama" }],
    onClick: () => {},
  };

  return shallow(<CategoriesSideBar {...props} />);
};

describe('CategoriesSideBar Component', () => {
  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper.find('Collapsible').length).toBe(1);
    expect(wrapper.find('CollapsibleItem').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(2);
  });
});
