import jwtdecode from 'jwt-decode';
import Toast from 'react-materialize';
import {showErrorNotification, showSuccessNotification} from '../notifications/notifications';

import { USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_SIGN_UP_FAILURE,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_SUCCESS,
  SET_CURRENT_USER } from './actiontype';

import api from './api';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export const setCurrentUser = user =>
  ({
    type: SET_CURRENT_USER,
    user
  });


/**
 * create action: userLoggedIn: user
 * @function userLoggedIn
 * @param {object} response
 * @returns {object} action: type and response
 */
export const userLoggedIn = user =>
  ({
    type: USER_LOGGED_IN,
    isAuthenticated: true,
    user
  });
export const userLoggedOut = user =>
  ({
    type: USER_LOGGED_OUT,
    isAuthenticated: false,
    user
  });
export const signInUserFailure = error =>
  ({
    type: USER_SIGN_IN_FAILURE,
    error
  });
  export const signUpUserFailure = error =>
  ({
    type: USER_SIGN_UP_FAILURE,
    error
  });
export const signUpUserSuccess = user => ({ type: SIGNUP_USER_SUCCESS, user });


/**
 * async helper function: sign in user
 * @function signup
 * @param {object} credentials
 * @returns {function} asynchronous action
 */
export const signup = data => dispatch => api
  .user
  .signup(data)
  .then((user) => {
    if (user.status !== 201) {
      dispatch(signUpUserFailure(user));
      Promise.reject(data);
    } else {
      dispatch(showSuccessNotification({user}));
      dispatch(signUpUserSuccess(user));
    }
  })
  .catch((error) =>{
    dispatch(showErrorNotification({ error }));

  });

/**
 * async helper function: sign in user
 * @function login
 * @param {object} credentials
 * @returns {function} asynchronous action
 */
export const login = credentials => dispatch => api
  .user
  .login(credentials)
  .then((user) => {
   const token = user.data.token;
    if (user.status !== 201) {
      dispatch(signInUserFailure(user));
      return Promise.reject(token);
    }
    localStorage.setItem('token', token);
     dispatch(showSuccessNotification({user}));
    setAuthorizationToken(token);
    dispatch(userLoggedIn(user));
  })
  .catch(error =>{
    dispatch(showErrorNotification({ error }))
    });


/**
 *
 *  @param {*} dispatch
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  setAuthorizationToken(false);
  dispatch(userLoggedOut());
};

