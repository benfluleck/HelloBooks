import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';
import { SignInPage } from
  '../../../../src/app/components/presentation/authentication/SignInPage';


/**
 * @description renders mock for the SignInPage
 *
 * @returns {component} shallow SignInPage
 */
function setup() {
  const props = {
    user: {
      username: '',
      password: '',
    },
    errors: {
      username: '',
      password: ''
    },
    onChange: () => {},
    onSignInSubmit: () => {},
    handleGoogleLogin: () => {},
    store: mockStore({ userReducer: { } })
  };

  return shallow(<SignInPage {...props} />);
}

describe('SignIn Component', () => {
  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextInput').length).toBe(2);
    expect(wrapper.find('Button').length).toBe(1);
  });
});
