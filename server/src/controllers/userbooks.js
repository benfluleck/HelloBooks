import { toDate } from 'validator';
import models from '../models';
import paginationfunc from '../controllers/middleware/pagination';

const UserBooks = models.UserBooks;
const Books = models.Books;
const User = models.User;

export default {
  /**
   * Route: POST: /users/loanbook
   * @description Loan a book
   * @param {any} req
   * @param {any} res
   * @returns {any} book
   * @memmberOf UserBooks Controller
   */
  loanbook(req, res) {
    req.params.userId = req.user.id.id || req.user.id;
    if (!req.body.returndate) {
      return res.status(404).send({ message: 'Please specify a valid return date' });
    }
    const returndate = req.body.returndate;
    if (toDate(returndate) < Date.now() || !toDate(returndate)) {
      return res.status(422).send({ message: 'Please provide a valid return date' });
    }
    if (req.params.userId === '') {
      return res.send(404).send({ success: false, message: 'User does not exist' });
    }
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User does not exist' });
        }
        UserBooks.findOne({
          where: { userid: req.params.userId, bookid: req.body.bookId, returnstatus: false },
          include: [{ model: Books, as: 'book', required: true }]
        }).then((bookfound) => {
          if (bookfound) {
            return res.status(409).send({ success: false, message: 'You have already borrowed this book' });
          }
          UserBooks.create({
            userid: req.params.userId,
            bookid: req.body.bookId,
            returndate
          })
            .then(() => {
              Books.findOne({ where: { id: req.body.bookId } })
                .then((booktoborrow) => {
                  if (!booktoborrow || booktoborrow.quantity === 0) {
                    return res.status(404).send({
                      success: false,
                      message: "Sorry we can't find this book or all copies of this book are on loan"
                    });
                  }
                  booktoborrow
                    .update({
                      quantity: (booktoborrow.quantity -= 1)
                    })
                    .then((borrowedbook) => {
                      res
                        .status(201)
                        .send({
                          success: true,
                          message: `${borrowedbook.title} succesfully loaned`
                        });
                    })
                    .catch(() => {
                      res
                        .status(500)
                        .send({ success: false, message: 'Error from the client end' });
                    });
                })
                .catch(() => {
                  res.status(500).send({ success: false, message: 'Error from the client end' });
                });
            })
            .catch(() => {
              res
                .status(404)
                .send({
                  success: false,
                  message:
'There is a problem with this user or book, Please contact the administrator'
                });
            });
        });
      })
      .catch((error) => {
        res.status(400).send({ success: false, message: ` ${error.message}` });
      });
  },

  
  /**
   * Route: GET: /users/getborrowedBooklist
   * @description Get list of borrowed books
   * @param {any} req
   * @param {any} res
   * @returns {any} book list
   * @memmberOf UserBooks Controller
   */
  getborrowedBooklist(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 3;
    req.params.userId = req.user.id.id || req.user.id;
    if (!req.query.returned) {
      return res.status(404).send({ message: 'Please specify a value for returned books' });
    }
    return UserBooks.findAndCountAll({
      where: {
        userid: req.params.userId,
        returnstatus: req.query.returned.trim()
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
          return res.status(404).send({ success: false, message: 'You have no books on your loan list' });
        }
        res.status(200).send({
          books: book.rows,
          pagination: paginationfunc(offset, limit, book)
        });
      })
      .catch(error => res.status(400).send(error.message));
  },

  /**
]  * Route: PUT: /users/returnbook
   * @description Return a book
   * @param {any} req
   * @param {any} res
   * @returns {any} book
   * @memmberOf UserBooks Controller
   */
  returnbook(req, res) {
    req.params.userId = req.user.id.id || req.user.id;
    UserBooks.findOne({
      where: {
        bookid: req.body.bookId,
        userid: req.params.userId,
        returnstatus: false
      },
      include: [
        {
          model: Books,
          as: 'book',
          required: true
        }
      ]
    })
      .then((book) => {
        if (!book) {
          return res.status(409).send({ success: false, message: 'You did not borrow this book' });
        }
        UserBooks.update(
          {
            returnstatus: true,
            userReturndate: Date.now()
          },
          {
            where: {
              userid: req.params.userId,
              bookid: req.body.bookId
            }
          }
        ).then(() => {
          Books.findOne({
            where: {
              id: req.body.bookId
            }
          }).then((bookToreturn) => {
            if (!bookToreturn) {
              return res.status(404).send({ message: 'The book is not in our library' });
            }
            bookToreturn
              .update({
                quantity: bookToreturn.quantity + 1
              })
              .then((returnedBook) => {
                if (returnedBook.userReturndate > returnedBook.returndate) {
                  res.status(201).send({
                    success: true,
                    message: `You have just returned ${returnedBook.title} late, A fine will be sent to you`
                  });
                } else {
                  res.status(201).send({
                    success: true,
                    message: `You have just returned ${returnedBook.title}`
                  });
                }
              });
          });
        });
      })
      .catch(error => res.status(500).send(error.message));
  },

  getHistory(req, res){
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 3;
    req.params.userId = req.user.id.id || req.user.id;

    return UserBooks.findAndCountAll({
      where: {
        userid: req.params.userId
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
          return res.status(404).send({ success: false, message: 'You have no books on your loan list' });
        }
        res.status(200).send({
          books: book.rows,
          pagination: paginationfunc(offset, limit, book)
        });
      })
      .catch(error => res.status(400).send(error.message));

  }
};
