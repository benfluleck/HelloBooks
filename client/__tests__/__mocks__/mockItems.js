
export default {
  testBook: {
    id: 1,
    title: 'Sheep',
    description: 'This is a book',
  },

  bookDetails: {

    book: {
      id: 1,
      author: 'an author',
      title: 'Andela One',
      description: 'description',
      quantity: 10,
      categoryId: 1,
      image: 'image.jpg'
    },
  },

  bookWithNoId: {
    author: 'an author',
    description: 'description',
    quantity: 10,
    categoryId: 1,
    image: 'image.jpg'
  },
  category: {
    id: 1,
    name: 'Science'
  },

  categoryWithoutId: {
    name: 'Biology'
  },

  // Membership types mock data
  userLevels: {
    id: 5,
    categoryName: 'Diamond',
    level: 6,
    maxDays: 11,
    maxBooks: 7
  },

  // notification mock data
  notification: {
    id: 1,
  },


  // borrowed mock data
  borrowedBook: {
    bookId: 1,
    borrowed: true
  },

  returnedBook: {
    bookId: 1,
    borrowed: false
  },

  userToSignIn: {
    username: 'bennytest',
    password: 'andelatest',
  },


  // user
  user: {
    id: 1,
    username: 'bennytest',
    email: 'ben@gmail.com',
  },

  userList: [
    {
      id: 1,
      username: 'benfluleck',
      firstName: 'Benny',
      surname: 'Ogidan',
      email: 'test@andela.com',
      password: 'testpassword',
      isAdmin: true
    },
    {
      id: 1,
      username: 'bennyogidan',
      firstName: 'Ben',
      surname: 'Ogidan',
      email: 'bennyogidant@andela.com',
      password: 'testpassword',
      isAdmin: true
    },
  ]
};
