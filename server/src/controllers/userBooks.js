import { toDate } from 'validator';
import models from '../models';
import paginationFunc from '../controllers/middleware/pagination';

const {
  User, Books, Userlevel, UserBooks, Notifications
} = models;


export default {
  /**
   * Route: POST: /users/loanbook
   *
   * @description Loan a book
   *
   * @param {any} req
   *
   * @param {any} res
   *
   * @returns {any} book
   *
   * @memmberOf UserBooks Controller
   */
  loanBook(req, res) {
    const userId = req.user.id.id || req.user.id;
    const bookId = req.body.bookId;
    if (!req.body.returnDate) {
      return res
        .status(404)
        .send({ message: 'Please specify a valid return date' });
    }
    if (toDate(req.body.returnDate) <= (Date.now() - (24 * 60 * 60 * 1000))) {
      return res
        .status(422)
        .send({ message: 'Please provide a valid return date' });
    }
    const returnDate = new Date(req.body.returnDate);
    User
      .findById(
        userId,
        {
          include: [{
            model: Userlevel,
            as: 'level',
            attributes: ['levelName', 'maxBooks', 'maxDays']
          }]
        }
      )
      .then((user) => {
        const userLevelDate = new Date(Date.now() +
        (user.level.maxDays * (24 * 60 * 60 * 1000)));
        if (!user) {
          return res
            .status(404)
            .send({
              message: 'User does not exist, Please register to borrow'
            });
        }
        if (returnDate > userLevelDate) {
          return res
            .status(409)
            .send({
              message: 'To loan this book for more days,' +
           ' You need to upgrade your user level,'
           + 'Please contact the administrator'
            });
        }
        if (user.borrowCount > user.level.maxBooks) {
          return res.status(400)
            .send({
              message:
              'You have exceeded your borrow limit, Why not return a book'
            });
        }
        user.update({
          borrowCount: (user.borrowCount + 1)
        });
        UserBooks.findOne({
          where: {
            userId,
            bookId,
            returnStatus: false
          },
          include: [
            {
              model: Books,
              as: 'book',
              required: true
            }
          ]
        }).then((bookFound) => {
          if (bookFound) {
            return res
              .status(409)
              .send({
                success: false,
                message: 'You have already borrowed this book'
              });
          }
          UserBooks
            .create({
              userId,
              bookId,
              returnDate
            })
            .then(() => {
              Books
                .findOne({
                  where: {
                    id: bookId
                  }
                })
                .then((bookToBorrow) => {
                  if (!bookToBorrow || bookToBorrow.quantity === 0) {
                    return res
                      .status(404)
                      .send({
                        success: false,
                        message: "Sorry we can't find this book or " +
                         'all copies of this book are on loan'
                      });
                  }
                  bookToBorrow
                    .update({
                      quantity: (bookToBorrow.quantity -= 1)
                    });

                  Notifications.create({
                    userId,
                    bookId,
                    action: 'Book Borrowed',
                  })
                    .then(() => {
                      const borrowedBook = {
                        username: user.username,
                        book: bookToBorrow.title,
                        borrowed: bookToBorrow.createdAt,
                        expectedReturnDate: bookToBorrow.returnDate,
                        userLevel: user.level.levelName
                      };
                      res
                        .status(200)
                        .send({
                          message: `${borrowedBook.book} succesfully loaned`
                        });
                    });
                });
            });
        });
      })
      .catch((error) => {
        res
          .status(500)
          .send({ success: false, message: ` ${error.message}` });
      });
  },

  /**
   * Route: GET: /users/getborrowedBooklist
   *
   * @description Get list of borrowed books
   *
   * @param {any} req
   *
   * @param {any} res
   *
   * @returns {any} book list
   *
   * @memmberOf UserBooks Controller
   */
  getBorrowedBookList(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 3;
    const userId = req.user.id.id || req.user.id;
    if (!req.query.returned) {
      return res
        .status(404)
        .send({ message: 'Please specify a value for returned books' });
    }
    return UserBooks.findAndCountAll({
      where: {
        userId,
        returnStatus: req
          .query
          .returned
          .trim()
      },
      include: [
        {
          model: Books,
          as: 'book',
          required: true
        }
      ],
      limit,
      offset
    }).then((book) => {
      if (book.length === 0) {
        return res
          .status(404)
          .send({ success: false, message: 'You have not loaned any books' });
      }
      res
        .status(200)
        .send({
          books: book.rows,
          pagination: paginationFunc(offset, limit, book)
        });
    }).catch(error => res.status(400).send(error.message));
  },

  /**
   * Route: PUT: /users/returnbook
   *
   * @description Return a book
   *
   * @param {any} req
   *
   * @param {any} res
   *
   * @returns {any} book
   *
   * @memmberOf UserBooks Controller
   */
  returnBook(req, res) {
    const userId = req.user.id.id || req.user.id;
    const bookId = req.body.bookId;
    UserBooks.findOne({
      where: {
        bookId,
        userId,
        returnStatus: false
      },
      include: [
        {
          model: Books,
          as: 'book',
          required: true
        }
      ]
    }).then((history) => {
      if (!history) {
        return res
          .status(409)
          .send({ success: false, message: 'You did not borrow this book' });
      }
      history.update({
        returnStatus: true,
        userReturnDate: Date.now()
      }, {
        where: {
          userId,
          bookId
        }
      }).then(() => {
        Books
          .findOne({
            where: {
              id: bookId
            }
          })
          .then((bookToReturn) => {
            if (!bookToReturn) {
              return res
                .status(404)
                .send({ message: 'The book is not in our library' });
            }
            bookToReturn
              .update({
                quantity: bookToReturn.quantity + 1
              });
            User.findById(userId)
              .then((user) => {
                user.update({
                  borrowCount: (user.borrowCount - 1),
                });
                Notifications.create({
                  userId,
                  bookId: history.bookId,
                  action: 'Book Returned',
                }).then(() => {
                  const returnDetail = {
                    username: user.username,
                    id: bookToReturn.id,
                    book: bookToReturn.title,
                    expectedReturnDate: history.returnDate,
                    returnedOn: history.userReturnDate
                  };
                  if (returnDetail.expectedReturnDate <
                    (returnDetail.returnedOn - (24 * 60 * 60 * 1000))) {
                    res
                      .status(200)
                      .send({
                        message:
                        `You have just returned ${returnDetail.book} 
                         late, A fine will be sent to you`,
                        returnedBook: returnDetail
                      });
                  } else {
                    res
                      .status(200)
                      .send({
                        message: `You have just returned ${returnDetail.book}`,
                        returnedBook: returnDetail
                      });
                  }
                });
              });
          });
      });
    }).catch(error => res.status(500).send(error.message));
  },

  /**
   * Route: GET: /users/overduebooks
   *
   * @description Get user overdue books
   *
   * @param {any} req
   *
   * @param {any} res
   *
   * @returns {any} book
   *
   * @memmberOf UserBooks Controller
   */
  getOverdueBooks(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 3;
    const userId = req.user.id.id || req.user.id;
    return UserBooks.findAndCountAll({
      where: {
        userId,
        returnStatus: false,
        returnDate: {
          $lt: (Date.now() - (24 * 60 * 60 * 1000))
        }
      },
      include: [
        {
          model: Books,
          as: 'book',
          required: true
        }
      ],
      limit,
      offset
    })
      .then((book) => {
        if (book.length === 0) {
          return res
            .status(404)
            .send({ message: 'You have no overdue books' });
        }
        res
          .status(200)
          .send({
            books: book.rows,
            pagination: paginationFunc(offset, limit, book)
          });
      }).catch(error => res.status(500).send(error.message));
  },


  /**
   * Route: GET: /users/userhistory
   * @description Get user loan history
   * @param {any} req
   * @param {any} res
   * @returns {any} book
   * @memmberOf UserBooks Controller
   */
  getLoanHistory(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 3;
    const userId = req.user.id.id || req.user.id;
    return UserBooks.findAndCountAll({
      where: {
        userId
      },
      include: [
        {
          model: Books,
          as: 'book',
          required: true
        }
      ],
      limit,
      offset,
      order: [
        ['createdAt', 'DESC']
      ]
    }).then((book) => {
      if (book.length === 0) {
        return res
          .status(404)
          .send({ message: 'You have no books on your loan list' });
      }
      res
        .status(200)
        .send({
          books: book.rows,
          pagination: paginationFunc(offset, limit, book)
        });
    }).catch(error => res.status(400).send(error.message));
  }
};
