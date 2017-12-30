import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedCategoriesOptions, { CategoriesOptions } from
  '../../../../src/app/components/container/categories/CategoriesOptionsList.jsx';


const setup = () => {
  const props = {
    categories: [{ id: 1, categoryName: "Action" },
      { id: 2, categoryName: "Drama" }],
    onClick: () => {},
  };

  return shallow(<CategoriesOptions {...props} />);
};

describe('CategoriesOption Component', () => {
  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('option').length).toBe(3);
  });
});


const store = mockStore({
  categoryReducer: {
    categories: {},
  }
});

const props = {
  categories: [{ id: 1, categoryName: "Action" },
    { id: 2, categoryName: "Drama" }],
  onClick: () => {},
};

describe('<Authentication Wrapper', () => {
  const connectedSetup = () => shallow(<ConnectedCategoriesOptions
    {...props}
    store={store} />);

  it('renders without crashing', () => {
    const wrapper = connectedSetup();
    expect(wrapper.length).toBe(1);
  });
});
