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
    fetchBooksByUserId: (offset, limit) => axios
      .get(`api/v1/users/borrowedbooks?offset=${offset}&limit=${limit}&returned=false`)
      .then(res => res.data),
    loanBook: book => axios.post('api/v1/users/loanbook', book)
      .then(res => res.data),
    returnBook: book => axios.put('api/v1/users/returnbook', book)
      .then(res => res.data),
    loanHistory: (offset, limit) => axios
      .get(`api/v1/users/getloanhistory?offset=${offset}&limit=${limit}`)
      .then(res => res.data),
    searchBooks: value => axios
      .get(`api/v1/books/search?searchTerm=${value}`)
      .then(res => res.data),
    fetchAllCategories: () => axios
      .get('api/v1/books/listcategories')
      .then(res => res.data),
    fetchAllBooksByCategories: (categoryId, offset, limit) => axios
      .get(`api/v1/books/category/${categoryId}?offset=${offset}&limit=${limit}`)
      .then(res => res.data),
    fetchSelectedBookById: bookId => axios
      .get(`api/v1/auth/books/${bookId}`)
      .then(res => res.data),
  },
  admin: {
    createBook: bookDetails => axios.post('api/v1/admin/books', bookDetails)
      .then(res => res.data),
    updateBook: (bookId, bookDetails) => axios.put(`api/v1/admin/books/${bookId}`, bookDetails)
      .then(res => res.data),
    deleteBook: bookId => axios.delete(`api/v1/admin/books/${bookId}`)
      .then(res => res.data),
    addCategory: categoryName => axios.post('api/v1/admin/category', categoryName)
      .then(res => res.data),
    editCategory: (categoryName, categoryId) => axios.put(`api/v1/admin/category/${categoryId}`, categoryName)
      .then(res => res.data),
    deleteCategory: categoryId => axios.delete(`api/v1/admin/category/${categoryId}`)
      .then(res => res.data),
  }
};
