import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import { mockStore } from '../../../__mocks__/mockConfig';
import { SignUpPage } from
  '../../../../src/app/components/presentation/authentication/SignUpPage';


/**
 *
 *
 * @returns { shallow } shallow
 */
function setup() {
  const props = {
    user: {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      passwordConfirmation: '',
      email: ''
    },
    errors: {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      passwordConfirmation: '',
      email: ''
    },
    onChange: () => {},
    onSignUpSubmit: () => {},
    store: mockStore({ userReducer: { } })
  };

  return shallow(<SignUpPage {...props} />);
}

describe('SignUp Component', () => {
  it('should render without throwing an error', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextInput').length).toBe(6);
    expect(wrapper.find('Button').length).toBe(1);
  });
});
