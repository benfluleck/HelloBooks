import models from '../models';
import Helper from '../Helper/helper';
import paginationfunc from '../controllers/middleware/pagination';

const User = models.User;
const UserBooks = models.UserBooks;
const Books = models.Books;

export default {
  loanbook(req, res) {
    UserBooks.findOne({
      where: {
        userid: req.params.userId,
        bookid: req.body.bookid,
        return_status: false
      },
      include: [
        {
          model: Books,
          as: 'book',
          required: true
        }
      ]
    }).then((bookfound) => {
    /**
     * Check if the book has been borrowed before,
     * User should borrow .
     */
      if (bookfound) {
        return res
          .status(409)
          .send({
            success: false,
            messsage: 'This book has already been borrowed by you',
          });
      }
      return UserBooks
        .create({
          userid: req.params.userId,
          bookid: req.body.bookid,
          return_date: req.body.return_date
        })
        .then(() => {
          Books
            .findOne({
              where: {
                id: req.body.bookid
              }
            })
            .then((loanbook) => {
              if (!loanbook || loanbook.quantity === 0) {
                return res
                  .status(404)
                  .send({ success: false, message: 'Book not found or All copies of this book are gone' });
              }

              loanbook
                .update({
                  quantity: loanbook.quantity -= 1
                })
                .then((updateBook) => {
                  res
                    .status(201)
                    .send({ success: true, message: `${updateBook.title} succesfully loaned`, updateBook });
                })
                .catch((error) => {
                  res
                    .status(500)
                    .send({
                      Errors: Helper.errorArray(error)
                    });
                });
            })
            .catch((error) => {
              res
                .status(500)
                .send({
                  Errors: Helper.errorArray(error)
                });
            });
        })
        .catch(() => {
          res
            .status(400)
            .send({ success: false, message: 'Check the Book or User' });
        });
    }).catch((error) => {
      res
        .status(404)
        .send({ success: false, message: ` ${error.message}` });
    });
  },

  getborrowerslist(req, res) {
    const offset = req.query.offset;
    const limit = req.query.limit;
    return UserBooks.findAndCountAll({
      where: {
        userid: req.params.userId,
        return_status: req.query.returned,
        
      },
      include: [
        {
          model: Books,
          as: 'book',
          required: true
        },
      ],
      limit,
      offset
    }).then((book) => {
      if (book.length === 0) {
        return res
          .status(404)
          .send({ success: false, message: 'You have no books on your loan list' });
      }
      res
        .status(200)
        .send({
          book,
          books: book.rows,
          pagination: paginationfunc(offset, limit, book)
        });
    }).catch(error => res.status(400).send(error.message));
  },

  returnbook(req, res) {
    return UserBooks.findOne({
      where: {
        bookid: req.body.bookid,
        userid: req.params.userId,
        return_status: true
      },
      include: [
        {
          model: Books,
          as: 'book',
          required: true
        }
      ]
    }).then((book) => {
      if (book) {
        return res
          .status(409)
          .send({ success: false, messsage: 'You have returned this book already', book });
      }

      return UserBooks.update({
        return_status: true,
        user_return_date: Date.now()
      }, {
        where: {
          userid: req.params.userId,
          bookid: req.body.bookid
        }
      }).then(() => {
        Books
          .findOne({
            where: {
              id: req.body.bookid
            }
          })
          .then((bookfound) => {
            if (!bookfound) {
              return res
                .status(404)
                .send({ message: 'Book does not exist in this database' });
            }
            return bookfound
              .update({
                quantity: bookfound.quantity + 1
              })
              .then((updatebook) => {
                res
                  .status(200)
                  .send({ success: true, message: `${updatebook.title} has been returned`, updatebook });
              })
              .catch(error => res.status(400).send(error.message));
          })
          .catch(error => res.status(400).send(error.message));
      });
    }).catch(error => res.status(500).send(error.message));
  }

};
