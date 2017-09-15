import { USER_LOGGED_IN } from './type'
import { USER_LOGGED_OUT } from './type'
import api from './api'
import setAuthorizationToken from '../utils/setAuthorizationToken'



export const userLoggedIn = user => ({
    type : USER_LOGGED_IN,
    user
})

export const userLoggedOut = user => ({
    type : USER_LOGGED_OUT,
    user
})


export const login = credentials=>(dispatch)=>
    api.user.login(credentials)
    .then(user =>{
        const token = user.data.token
        localStorage.setItem('token', token);
        setAuthorizationToken(token);
        dispatch(userLoggedIn(user));
        return user.data
    })
    .catch(error => dispatch(userLoggedIn(error.response))
    );

    export const logout = ()=>(dispatch)=>{
        localStorage.removeItem('token');
        dispatch(userLoggedOut())
    };