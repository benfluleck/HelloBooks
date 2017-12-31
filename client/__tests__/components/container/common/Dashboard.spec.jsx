import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';
import GetDashboardWrapper, { Dashboard } from
  '../../../../src/app/components/container/common/Dashboard.jsx';

const FakeDashboard = () => (<div/>);

const user = {
  username: '', email: '', firstname: '', lastname: '',
};

const props = {
  wrappedDashboard: FakeDashboard,
  user
};


describe('Dashboard Component', () => {
  const setup = () => shallow(<Dashboard {...props}/>);

  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });
});

const FakeDashboardWrap = GetDashboardWrapper(FakeDashboard);

const store = mockStore({
  userReducer: {
    user
  }
});
const setup = () => shallow(<FakeDashboardWrap props={props} store={store}/>);

describe('<Dashboard Wrapper', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.props().username).toEqual(props.username);
    expect(wrapper.props().email).toEqual(props.email);
  });
});
