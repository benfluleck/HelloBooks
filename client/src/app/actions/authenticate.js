import { showErrorNotification, showSuccessNotification } from './notifications';

import { USER_LOGGED_IN,
  USER_LOG_IN_FAILURE,
  USER_LOGGED_OUT,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE
} from './actiontype';

import api from './api';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 * create action: userLoggedIn: user
 *
 * @function userLoggedIn
 *
 * @param {object} data
 *
 * @returns {object} action: type and response
 */
export const userLoggedIn = data =>
  ({
    type: USER_LOGGED_IN,
    data
  });

export const userLogInFailure = error =>
  ({
    type: USER_LOG_IN_FAILURE,
    error
  });

/**
 * create action: userLoggedIn: user
 *
 * @function userLoggedOut
 *
 * @param {object} user
 *
 * @returns {object} action: type and response
 */
export const userLoggedOut = user =>
  ({
    type: USER_LOGGED_OUT,
    user
  });

/**
 * create action: sign : user
 *
 * @function userAuthFailure
 *
 * @param {object} user
 *
 * @returns {object} action: type and response
 */
export const signUpUserFailure = user =>
  ({
    type: SIGNUP_USER_FAILURE,
    user
  });

/**
 * create action: signUpUserSuccess : user
 *
 * @function signUpUserSuccess
 *
 * @param {object} user
 *
 * @returns {object} action: type and response
 */
export const signUpUserSuccess = user =>
  ({
    type: SIGNUP_USER_SUCCESS,
    user
  });

/**
 * async helper function: sign up user
 *
 * @function signup
 *
 * @param {object} data
 *
 * @returns {function} asynchronous action
 */
export const signup = data => dispatch => api
  .user
  .signup(data)
  .then((user) => {
    dispatch(signUpUserSuccess(user));
    dispatch(showSuccessNotification({ user }));
    return user;
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(signUpUserFailure(error));
  });

/**
 * async helper function: log in user
 *
 * @function login
 *
 * @param {object} credentials
 *
 * @returns {function} asynchronous action
 */
export const login = credentials => dispatch => api
  .user
  .login(credentials)
  .then((user) => {
    const token = user.data.token;
    localStorage.setItem('token', token);
    dispatch(showSuccessNotification({ user }));
    setAuthorizationToken(token);
    dispatch(userLoggedIn(user.data));
    return (user.data);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(userLogInFailure(error));
  });

/**
 * async helper function: log out user
 *
 * @function logout
 *
 * @returns {function} asynchronous action
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('state');
  localStorage.clear();
  setAuthorizationToken(false);
  dispatch(userLoggedOut());
};

