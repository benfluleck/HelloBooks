import React from 'react';
import { shallow } from 'enzyme';
import Pagination from
  '../../../src/app/components/container/common/Pagination';

jest.mock('react-router-dom');

const props = {
  fetch: jest.fn(() => Promise.resolve()),
  numberOfRecords: 3,
  config: {}
};
const setup = () => shallow(<Pagination {...props} />);
describe('Pagination', () => {
  it('should render component without breaking', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Row')).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });
  it('should render a new page when another' +
  'page is selected using default props', () => {
    const wrapper = setup();
    const onSelectSpy = jest.spyOn(wrapper.instance(), 'onSelect');
    wrapper
      .instance()
      .onSelect(2);
    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });
});
