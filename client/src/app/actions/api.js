import axios from 'axios';

export default {
  user: {
    login: credentials => axios.post('api/v1/auth/users/signin', credentials),

    signup: data => axios.post('api/v1/auth/users/signup', data)
  },
  book: {
    fetch: (offset, limit) => axios
      .get(`api/v1/books?offset=${offset}&limit=${limit}`)
      .then(res => res.data),
    fetchRecentBooks: (offset, limit) => axios
      .get(`api/v1/auth/books/recentbooks?offset=${offset}&limit=${limit}`)
      .then(res => res.data),
    fetchOverdueBooks: (offset, limit) => axios
      .get(`api/v1/users/getoverduebooks?offset=${offset}&limit=${limit}`)
      .then(res => res.data),
    fetchbooksbyUserId: (offset, limit) => axios
      .get(`api/v1/users/borrowedbooks?offset=${offset}&limit=${limit}&returned=false`)
      .then(res => res.data),
    loanbook: data => axios.post('api/v1/users/loanbook', data)
      .then(res => res.data),
    returnbook: data => axios.put('api/v1/users/returnbook', data)
      .then(res => res.data),
    loanhistory: (offset, limit) => axios
      .get(`api/v1/users/getloanhistory?offset=${offset}&limit=${limit}`)
      .then(res => res.data),
    searchBooks: value => axios
      .get(`api/v1/books/search?searchTerm=${value}`)
      .then(res => res.data)
  }
};
