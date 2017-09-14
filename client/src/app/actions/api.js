import axios from 'axios';
import apiRoute from './apiRoute'

// export default {
// user:{
//     login: credentials =>
//     axios.post(`${apiRoute}/users/signin`,
//     {credentials}).then(res => res.data.user)
// }

// };


export default {
    user:{
        login: credentials =>
        axios.post('/api/v1/users/signin',
        credentials)
    }
}
    //     .then((res,err) => 
            
    //         res.data.user
    //     , err => (err))
    // }
    
    // };