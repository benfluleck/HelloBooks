import {USER_LOGGED_IN} from '../actions/type'

export default function user(state = {}, action={}) {
    switch (action.type) {
        case USER_LOGGED_IN:

        // console.log('--------this is being executed')
        // console.log(action)
            return {...state, user: action.user};
        default: return state;
        
    }
}