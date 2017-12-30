import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';
import GetCategoriesWrapper, { GetCategories } from
  '../../../../src/app/components/container/categories/GetCategoriesWrapper.jsx';

const FakeCategories = () => (<div/>);
const categories = [{ id: 1, categoryName: "Action" },
  { id: 2, categoryName: "Drama" }];
const props = {
  wrappedComponent: FakeCategories,
  categoryList: categories,
  onChange: () => {},
  onClick: () => {},
  fetchBooksForCategories: jest.fn(() => Promise.resolve()),
};

describe('GetCategories Component', () => {
  const setup = () => shallow(<GetCategories {...props}/>);
  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
  });
  it('should call the handleClick method', () => {
    const wrapper = setup();
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick');
    wrapper.instance().handleClick(categories.id);
    expect(handleClickSpy).toHaveBeenCalledTimes(1);
  });
});

const FakeCategoriesWrap = GetCategoriesWrapper(FakeCategories);

const store = mockStore({
  categoryReducer: categories
});
const setup = () => shallow(<FakeCategoriesWrap props={props} store={store}/>);

describe('<GetCategories Wrapper', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    wrapper.setProps({ categoryList: undefined });
    expect(wrapper.length).toBe(1);
  });
});
