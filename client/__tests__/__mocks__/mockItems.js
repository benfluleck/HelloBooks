
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

  bookOperations: {

    bookId: 1,
    userId: 1,
    returnStatus: true,
    bookImage: 'image.jpg'
  },

  bookWithNoId: {
    author: 'an author',
    description: 'description',
    quantity: 10,
    categoryId: 1,
    image: 'image.jpg'
  },
  category: {
    categoryId: 1,
    categoryName: 'Science'
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
    newPassword: 'andelaone'
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
  ],

  imageData: 'WFWFWFWFWFSFDWF',
  booksFound: [
    {
      id: 1,
      title: 'Capital',
      author: 'Thomas Piketty',
      categoryId: 1,
      quantity: '21',
      description: 'This is a test book description',
      bookImage: 'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,h_499,w_325/v1507396539/Capital_in_the_First_Century_bc4bfw.webp',
      ISBN: 12163242,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  allBooksList: [
    {
      id: 1,
      title: 'Capital',
      author: 'Thomas Piketty',
      categoryId: 1,
      quantity: '21',
      description: 'This is a test book description',
      bookImage: 'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,h_499,w_325/v1507396539/Capital_in_the_First_Century_bc4bfw.webp',
      ISBN: 12163242,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'The House on the Borderland',
      author: 'William Hope Hodgson',
      categoryId: 1,
      quantity: '21',
      description: 'This is another description',
      bookImage: 'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,h_499,w_325/v1507396518/51iMfGw6LcL._AC_UL320_SR202_320__ret7dc.jpg',
      ISBN: 124363242,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  borrowedBooksList: [{
    bookId: 3,
    userId: 2,
    returnDate: '2017-12-24T00:00:00.000Z',
    userReturnDate: null,
    returnStatus: false,
    overdueAmount: null,
    createdAt: '2017-12-22T23:40:42.176Z',
    updatedAt: '2017-12-22T23:40:42.176Z',
    id: 67,
    book: {
      id: 3,
      title: 'Scary or Die',
      author: 'Corbin Bleu',
      ISBN: 12334542,
      description: 'Mollitia voluptatum ut. Autem id sed.',
      categoryId: 3,
      quantity: 20,
      bookImage: 'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,h_499,w_325/v1507396540/images_tlhli6.jpg',
      createdAt: '2017-12-14T18:01:23.179Z',
      updatedAt: '2017-12-22T23:40:42.186Z',
      deletedAt: null
    }
  },
  {
    bookId: 5,
    userId: 2,
    returnDate: '2017-12-24T00:00:00.000Z',
    userReturnDate: null,
    returnStatus: false,
    overdueAmount: null,
    createdAt: '2017-12-22T23:40:52.831Z',
    updatedAt: '2017-12-22T23:40:52.831Z',
    id: 69,
    book: {
      id: 5,
      title: 'A Column of Fire',
      author: 'Ken Follet',
      ISBN: 123362332,
      description: 'Natus et molestiae sunt quasi. Culpa in',
      categoryId: 2,
      quantity: 20,
      bookImage: 'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,h_499,w_325/v1507396540/9781447278733_atkrje.jpg',
      createdAt: '2017-12-14T18:01:23.179Z',
      updatedAt: '2017-12-22T23:40:52.841Z',
      deletedAt: null
    }
  }],
};
