import axios from 'axios';


export default {
    user:{
        login: credentials =>
        axios.post('api/v1/users/signin',
        credentials)
    }
}
   