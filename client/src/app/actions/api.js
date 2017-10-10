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
    fetch: (offset, limit) => axios
      .get(`api/v1/books?offset=${offset}&limit=${limit}`)
      .then(res => res.data),
    fetchbyUserId: (offset, user, limit) => axios
      .get(`api/v1/users/${user.id}/books?offset=${offset}&limit=${limit}&returned=false`)
      .then(res => res.data)

  }
};
