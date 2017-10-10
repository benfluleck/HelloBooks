import jwtdecode from 'jwt-decode';

import { USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_SIGN_IN_FAILURE,
  SIGNUP_USER_SUCCESS,
  SET_CURRENT_USER } from './type';

import api from './api';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export const setCurrentUser = user =>
  ({
    type: SET_CURRENT_USER,
    user
  });
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
    isAuthenticated: false,
    error
  });
export const signUpUserSuccess = user => ({ type: SIGNUP_USER_SUCCESS, user });


/**
 *
 * @param {*} data
 *
 *
 */
export const signup = data => dispatch => api
  .user
  .signup(data)
  .then((user) => {
    const data = user.data;
    if (user.status !== 200) {
      dispatch(signInUserFailure(user));
      Promise.reject(data);
    } else {
      dispatch(signUpUserSuccess(user));

      return user.data;
    }
  })
  .catch(error => dispatch(signInUserFailure(error.response)));

/**
 * 
 * @param {*} credentials 
 */
export const login = credentials => dispatch => api
  .user
  .login(credentials)
  .then((user) => {
    const token = user.data.token;
    const username = user.data.username;

    if (user.status !== 200) {
      dispatch(signInUserFailure(user));
      return Promise.reject(token);
    }
    global.localStorage.setItem('token', token);
    global.localStorage.setItem('username', username);

    setAuthorizationToken(token);
    dispatch(userLoggedIn(user.data));
    dispatch(setCurrentUser(jwtdecode(token)));
    return user.data;
  })
  .catch(error => dispatch(signInUserFailure(error.response)));


/**
 *
 *  @param {*} dispatch
 */
export const logout = () => (dispatch) => {
  global.localStorage.removeItem('token');
  global.localStorage.removeItem('username');
  setAuthorizationToken(false);
  dispatch(userLoggedOut());
};

