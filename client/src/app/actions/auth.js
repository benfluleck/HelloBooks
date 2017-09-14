import {USER_LOGGED_IN} from './type'
import api from './api'


export const userLoggedIn = user => ({
    type : USER_LOGGED_IN,
    user
})



// export const login = credentials=>(dispatch)=>
//     api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));

export const login = credentials=>(dispatch)=>
api.user.login(credentials).then(userID => {
    dispatch(userLoggedIn(userID))
}).catch(error=>{
    dispatch(userLoggedIn(error));
});