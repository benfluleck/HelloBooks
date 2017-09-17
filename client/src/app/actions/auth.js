import {USER_LOGGED_IN} from './type'
import {USER_LOGGED_OUT} from './type'
import {USER_SIGN_IN_FAILURE} from './type'
import {SIGNUP_USER_SUCCESS} from './type' 

import api from './api'
import setAuthorizationToken from '../utils/setAuthorizationToken'

export const userLoggedIn = user => ({type: USER_LOGGED_IN, user})
export const userLoggedOut = user => ({type: USER_LOGGED_OUT, user})
export const signInUserFailure = error => ({type: USER_SIGN_IN_FAILURE, error})
export const signUpUserSuccess = user => ({type: SIGNUP_USER_SUCCESS, user})


export const signup = data => (dispatch) => api
		.user
		.signup(data)
		.then((user) => {
			const data  = user.data
				console.log(user)
				
				if (user.status != 200) {
					
						dispatch(signUpUserFailure(user));
						reject(data); 
				} else {
						
						dispatch(signUpUserSuccess(user));
	
						return user.data
				}
		}).catch(error => dispatch(signInUserFailure(error.response)));

//.then(user => dispatch(userLoggedIn(user)));

export const login = credentials => (dispatch) => api
		.user
		.login(credentials)
		.then(user => {
				const token = user.data.token
				if (user.status != 200) {
						dispatch(signInUserFailure(user));
						reject(token);
				} else {
						localStorage.setItem('token', token);
						localStorage.userJWT
						setAuthorizationToken(token);
						dispatch(userLoggedIn(user));
						return user.data
				}
		})
		.catch(error => dispatch(signInUserFailure(error.response)));

export const logout = () => (dispatch) => {
		localStorage.removeItem('token');
		dispatch(userLoggedOut())
};
