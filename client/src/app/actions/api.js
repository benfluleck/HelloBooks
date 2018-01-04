import axios from 'axios';

export default {
  user: {
    login: credentials => axios.post('api/v1/auth/users/signin', credentials),

    signup: credentials => axios.post('api/v1/auth/users/signup', credentials),

    changePassword: (password, oldPassword) =>
      axios.put(
        'api/v1/users/changepassword',
        password, oldPassword
      )
  },
  book: {
    fetch: (offset, limit) => axios
      .get(`api/v1/books?offset=${offset}&limit=${limit}`)
      .then(response => response.data),

    fetchRecentBooks: (offset, limit) => axios
      .get(`api/v1/auth/books/recentbooks?offset=${offset}&limit=${limit}`)
      .then(response => response.data),

    fetchOverdueBooks: (offset, limit) => axios
      .get(`api/v1/users/getoverduebooks?offset=${offset}&limit=${limit}`)
      .then(response => response.data),

    fetchBooksByUserId: (offset, limit) => axios
      .get(`api/v1/users/borrowedbooks?offset=${offset}&limit=${limit}&returned=false`)
      .then(response => response.data),

    borrowBook: book => axios.post('api/v1/users/loanbook', book)
      .then(response => response.data),

    returnBook: book => axios.put('api/v1/users/returnbook', book)
      .then(response => response.data),

    loanHistory: (offset, limit) => axios
      .get(`api/v1/users/getloanhistory?offset=${offset}&limit=${limit}`)
      .then(response => response.data),

    searchBooks: value => axios
      .get(`api/v1/books/search?searchTerm=${value}`)
      .then(response => response.data),

    fetchAllCategories: () => axios
      .get('api/v1/books/listcategories')
      .then(response => response.data),

    fetchAllBooksByCategories: (categoryId, offset, limit) => axios
      .get(`api/v1/books/category/${categoryId}?offset=${offset}&limit=${limit}`)
      .then(response => response.data),

    fetchSelectedBookById: bookId => axios
      .get(`api/v1/auth/books/${bookId}`)
      .then(response => response.data),
  },

  admin: {
    createBook: bookDetails => axios.post('api/v1/admin/books', bookDetails)
      .then(response => response.data),
    updateBook: (bookId, bookDetails) =>
      axios.put(
        `api/v1/admin/books/${bookId}`,
        bookDetails
      )
        .then(response => response.data),
    deleteBook: bookId => axios.delete(`api/v1/admin/books/${bookId}`)
      .then(response => response.data),

    addCategory: categoryName => axios.post(
      'api/v1/admin/category',
      categoryName
    ).then(response => response.data),

    editCategory: (categoryName, categoryId) =>
      axios.put(
        `api/v1/admin/category/${categoryId}`,
        categoryName
      )
        .then(response => response.data),
    deleteCategory: categoryId =>
      axios.delete(`api/v1/admin/category/${categoryId}`)
        .then(response => response.data),

    getUserList: (offset, limit) =>
      axios.get(`api/v1/admin/getuserlist/?offset=${offset}&limit=${limit}`)
        .then(response => response.data),

    getUserLevelList: () =>
      axios.get('api/v1/auth/getuserlevellist')
        .then(response => response.data),

    changeUserlevel: (newLevelId, userId) =>
      axios.put(
        'api/v1/admin/changeuserlevel',
        newLevelId, userId
      ).then(response => response.data),

    getUser: userId =>
      axios.get(`api/v1/admin/users/${userId}`)
        .then(response => response.data),

    getAdminNotifications: (offset, limit) =>
      axios.get(`api/v1/admin/notifications/?offset=${offset}&limit=${limit}`)
        .then(response => response.data)
  }
};
