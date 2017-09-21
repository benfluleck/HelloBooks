import User from './user';
import models from '../models';
import Helper from '../Helper/helper';

const Books = models.Books;



/**
 * 
 */
export default {
  create(req, res) {
    if (User === null) {
      return res.json({success: false, message: 'You need to be logged in.'});
    }
    return Books
      .create({title: req.body.title, author: req.body.author, category: req.body.category, quantity: req.body.quantity, description: req.body.description})
      .then(books => res.json({Book_number: books.bookid, Book: books.title, Author: books.author, Description: books.description, Number: books.quantity}))
      .catch(error => {
        if (error.name === "SequelizeUniqueConstraintError") {
          res.json({error: 'Unique Error', message: 'The book with this author is already in the database, try to add to books'});

        } else {
          res
            .status(401)
            .send({
              Errors: Helper.errorArray(error)
            });
        }
      });
  },
  update(req, res) {
    return Books
      .findById(req.params.bookId)
      .then((book) => {
        if (req.params.bookId === null) {
          return res.json({success: false, message: 'Enter a parameter'});
        }
        if (!book) {
          return res
            .status(404)
            .send({message: 'Book does not exist in this database'});
        }
        return book
          .updateAttributes(req.body, {
          fields: Object.keys(req.body)
        })
          .then(() => res.status(201).send(book))
          .catch(error => {
            if (error.name === "SequelizeUniqueConstraintError") {
              res.json({
                error: 'Unique Error',
                message: 'The book with this author is already in the database try editing the book quanti' +
                    'ty'
              });

            } else {
              res
                .status(401)
                .send({
                  Errors: Helper.errorArray(error)
                });
            }
          });
      })
      .catch(error => res.status(500).send({
        Errors: Helper.errorArray(error)
      }));
  },

  getAllBooks(req, res) {
    return Books
      .all()
      .then(book => {
        if (book == '' || book == undefined || book == null) {
          res.json({error: 'Empty', message: 'There are no books present in the database'});
        } else {
          res
            .status(200)
            .send({book});
        }
      })
      .catch(error => res.status(501).send(error.message));
  }

};
