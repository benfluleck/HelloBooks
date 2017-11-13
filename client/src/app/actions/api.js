import axios from 'axios';

/**
 *
 */
export default {
  user: {
    login: credentials => axios.post('api/v1/auth/users/signin', credentials),

    signup: data => axios.post('api/v1/auth/users/signup', data)
  },
  book: {
    fetch: (offset, limit) => axios
      .get(`api/v1/books?offset=${offset}&limit=${limit}`)
      .then(res => res.data),
    fetchRecentbooks: (offset, limit) => axios
      .get(`api/v1/auth/books/recentbooks?offset=${offset}&limit=${limit}`)
      .then(res => res.data),
    fetchbooksbyUserId: (offset,limit) => axios
      .get(`api/v1/users/borrowedbooks?offset=${offset}&limit=${limit}&returned=false`)
      .then(res => res.data)


  }
};
