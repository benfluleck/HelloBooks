export default {
  user: {
    id: 1,
    username: 'benfluleck',
    firstName: 'Benny',
    surname: 'Ogidan',
    email: 'test@andela.com',
    password: 'testpassword',
    isAdmin: true
  },
  user2: {
    id: 1,
    username: 'bennyogidan',
    firstName: 'Ben',
    surname: 'Ogidan',
    email: 'bennyogidant@andela.com',
    password: 'testpassword',
    isAdmin: true
  },
  userLevels: [
    {
      levelName: 'Bronze',
      level: 1,
      maxBooks: 2,
      maxDays: 3
    },
    {
      levelName: 'Silver',
      level: 2,
      maxDays: 5,
      maxBooks: 5
    },
    {
      levelName: 'Gold',
      level: 3,
      maxDays: 10,
      maxBooks: 7
    },
    {
      levelName: 'Platinium',
      level: 4,
      maxBooks: 50,
      maxDays: 14,
    }
  ],
  categories: [
    {
      id: 5,
      categoryName: 'Fiction'
    },
    {
      id: 7,
      categoryName: 'Test Category',
    },
    {
      id: 5,
      categoryName: 'Bio'
    }
  ],
  books: [
    {
      id: 1,
      title: 'Capital',
      author: 'Thomas Piketty',
      categoryId: '1',
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
      categoryId: '2',
      quantity: '21',
      description: 'This is another description',
      bookImage: 'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,h_499,w_325/v1507396518/51iMfGw6LcL._AC_UL320_SR202_320__ret7dc.jpg',
      ISBN: 124363242,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  borrowedBooks: [{
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
  notifications: [
    {
      id: 138,
      userId: 2,
      bookId: 5,
      action: 'Book Borrowed',
      createdAt: '2017-12-22T23:40:52.841Z',
      updatedAt: '2017-12-22T23:40:52.841Z',
      book: {
        title: 'A Column of Fire'
      },
      user: {
        username: 'bennyogidan'
      }
    },
    {
      id: 137,
      userId: 2,
      bookId: 4,
      action: 'Book Borrowed',
      createdAt: '2017-12-22T23:40:47.840Z',
      updatedAt: '2017-12-22T23:40:47.840Z',
      book: {
        title: 'Origin'
      },
      user: {
        username: 'bennyogidan'
      }
    }
  ],
};

