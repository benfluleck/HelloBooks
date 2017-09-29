import axios from 'axios';


/**
 * 
 */
export default {
  user: {
    login: credentials => axios.post('api/v1/users/signin', credentials),

    signup: data => axios.post('api/v1/users/signup', data)
  },
  book: {
    fetch: data => axios
      .get('api/v1/books', data).then(res => res.data)


  }
};
