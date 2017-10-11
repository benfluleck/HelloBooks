import models from '../models';
import Helper from '../Helper/helper';
import paginationfunc from '../controllers/middleware/pagination';

const Books = models.Books;


export default {

  /**
   *
   * @description creates a book
   * @param {any} req
   * @param {any} res
   * @returns {any} book
   *
   * @memmberOf BookController
  */
  create(req, res) {
    return Books
      .findOne({
        where: { title: req.body.title }

      })
      .then((book) => {
        if (book !== null) {
          return res.status(400)
            .send({ message: 'A book with the same title already exist' });
        }
        return Books
          .create({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            quantity: req.body.quantity,
            description: req.body.description,
            book_image: req.body.book_image
          })
          .then(books =>
            res.status(201).send({
              Book_title: books.title,
              Author: books.author,
              Description: books.description,
              Number: books.quantity,
              Image: books.book_image
            }))
          .catch((error) => {
            if (error.name === 'SequelizeUniqueConstraintError') {
              res.json({ error: 'Unique Error', message: 'The book with this author is already in the database, try to add to books' });
            } else {
              res
                .status(401)
                .send({
                  Errors: Helper.errorArray(error)
                });
            }
          })
          .catch(error => res.status(401).send(error));
      });
  },

  /**
   *
   * @description update a book
   * @param {any} req
   * @param {any} res
   * @returns {any} book
   *
   * @memmberOf BookController
   *
   *
   */
  update(req, res) {
    return Books
      .findById(req.params.bookId)
      .then((book) => {
        if (req.params.bookId === null) {
          return res.json({ success: false, message: 'Enter a parameter' });
        }
        if (!book) {
          return res
            .status(404)
            .send({ message: 'Book does not exist in this database' });
        }
        return book
          .updateAttributes(req.body, {
            fields: Object.keys(req.body)
          })
          .then(() => res.status(201).send(book))
          .catch((error) => {
            if (error.name === 'SequelizeUniqueConstraintError') {
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

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {any} delete books
   *
   *
   */
  destroybooks(req, res) {
    if (req.params.bookId === 'undefined') {
      return res.status(404).send({ success: false, message: 'Book not found' });
    }
    return Books
      .findById({
        where: {
          id: req.params.bookId,
        },
      })
      .then((book) => {
        if (!book) {
          return res.status(404).send({ success: false, message: 'Book not found' });
        }
        book.destroy();
        return res.status(200).send({ success: true, message: 'Book successfully deleted' });
      })
      .catch(() => res.status(400).send({ success: false, message: 'Enter valid inputs!' }));
  },

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {any} books
   */
  getAllBooks(req, res) {
    const offset = req.query.offset;
    const limit = req.query.limit;
    return Books
      .findAndCountAll({
        limit,
        offset
      })
      .then((books) => {
        if (books.count === 0) {
          res.json({ error: 'Empty', message: 'There are no books present in the database' });
        } else {
          res
            .status(200)
            .send({
              books: books.rows,
              pagination: paginationfunc(offset, limit, books)
            });
        }
      })
      .catch(error => res.status(501).send(error.message));
  }

};
