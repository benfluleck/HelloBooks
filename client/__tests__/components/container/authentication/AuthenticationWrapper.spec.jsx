import React from 'react';
import { shallow } from 'enzyme';

import { mockStore } from '../../../__mocks__/mockConfig';
/* eslint-disable */
import AuthenticationWrapper, { AuthComponent } from
  '../../../../src/app/components/presentation/authentication/AuthenticationWrapper';


const FakeCompomnent = () => (<div />);

let event;


const user = {
  username: 'benfluleck',
  password: 'benfluleck',
  email: 'ben@gmail.com',
  firstname: 'Benny',
  lastname: 'Ogidan',
  passwordConfirmation: 'benfluleck'
};

const badUser = {
  username: '',
  password: 'benfluleck',
  email: 'ben@gmail.com',
  firstname: 'Benny',
  lastname: 'Ogidan',
  passwordConfirmation: 'benfluleck'
};

const props = {
  user,
  errors: {},

  wrappedComponent: FakeCompomnent,

  signup: jest.fn(() => Promise.resolve()),
  login: jest.fn(() => Promise.resolve()),
  history: {}
};


const profileObj = {
  email: 'bo57@gmail.com',
  givenName: 'benny',
  familyName: 'ogidan',
  googleId: '11229993',
  imageUrl: 'kndknsl'
};

describe('<Authentication', () => {
  const setup = () => shallow(<AuthComponent {...props} />);
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('SiteFooter').length).toBe(1);
  });
  it('should call the onChange method', () => {
    const wrapper = setup();
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    event = {
      preventDefault: jest.fn(),
      target: {
        username: 'testuser',
        password: 'topper234',
      }
    };
    wrapper.instance().onChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the handleGoogleLogin method', () => {
    const wrapper = setup();
    const handleGoogleLoginSpy =
    jest.spyOn(
      wrapper.instance(),
      'handleGoogleLogin'
    );
    const response = {
      profileObj
    };
    wrapper.instance().handleGoogleLogin(response);
    expect(handleGoogleLoginSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the onSignInSubmit method', () => {
    const wrapper = setup();
    const onSignInSubmitSpy = jest
      .spyOn(wrapper.instance(), 'onSignInSubmit');
    wrapper.instance().onSignInSubmit(event);
    expect(onSignInSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the onSignUpSubmit method', () => {
    const wrapper = setup();
    const onSignUpSubmitSpy = jest
      .spyOn(wrapper.instance(), 'onSignUpSubmit');
    event = {
      preventDefault: jest.fn(),
      target: {
        firstname: 'Benny',
        lastname: 'Ogidan',
        email: 'bo57@kent.ac.uk',
        username: 'testuser',
        password: 'topper234',
        passwordConfirmation: 'topper234',
      }
    };
    wrapper.setState({ user });
    wrapper.instance().onSignUpSubmit(event);
    expect(onSignUpSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the isValid method with a valid user object', () => {
    const wrapper = setup();
    wrapper.setState({ user });
    const isFormValidOnSpy = jest.spyOn(wrapper.instance(), 'isValid');
    wrapper.instance().isValid();
    expect(isFormValidOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the isValid method with an Invalid user object', () => {
    const wrapper = setup();
    wrapper.setState({ badUser });
    const isFormValidOnSpy = jest.spyOn(wrapper.instance(), 'isValid');
    wrapper.instance().isValid();
    expect(isFormValidOnSpy).toHaveBeenCalledTimes(1);
  });
});


const AuthFakeAuthentication = AuthenticationWrapper(FakeCompomnent);

const store = mockStore({
  userReducer: {
    user,
  }
});

describe('<Authentication Wrapper', () => {
  const setup = () => shallow(<AuthFakeAuthentication
    {...props}
    store={store} />);

  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
});
