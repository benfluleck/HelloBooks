import { USER_LOGGED_IN } from './type';
import { USER_LOGGED_OUT } from './type';
import { USER_SIGN_IN_FAILURE } from './type';
import { SIGNUP_USER_SUCCESS } from './type';


import api from './api';
import setAuthorizationToken from '../utils/setAuthorizationToken';

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
 * @param {signup} data
 * Sign up dispatcher
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
    return user.data;
  })
  .catch(error => dispatch(signInUserFailure(error.response)));


/**
 *
 *  @param {*} dispatch
 */
export const logout = () => (dispatch) => {
  global.localStorage.removeItem('token');
  setAuthorizationToken(false);
  dispatch(userLoggedOut());
};

