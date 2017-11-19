import models from '../models';
import paginationfunc from '../controllers/middleware/pagination';

const Books = models.Books;

export default {
  /**
   * Route: POST: /books
   * @description creates a book
   * @param {any} req
   * @param {any} res
   * @returns {any} book
   * @memmberOf BookController
  */
  create(req, res) {
    Books.findOne({
      where: {
        $and: [{ title: req.body.title }, { author: req.body.author }]
      }
    }).then((bookExists) => {
      if (bookExists !== null) {
        return res.status(409).send({
          message: 'A book with the same title and author already exists in the library'
        });
      }
      return Books.create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        quantity: req.body.quantity,
        description: req.body.description,
        bookimage: req.body.bookimage
      })
        .then(books => res.status(201).send({ message: `${books.title} has been added to the library` }))
        .catch(error => res.status(401).send(error));
    });
  },

  /**
   * Route: PUT: /books/:bookId
   * @description update a book
   * @param {any} req
   * @param {any} res
   * @returns {any} book
   * @memmberOf BookController
   */
  update(req, res) {
    return Books.findById(req.params.bookId)
      .then((book) => {
        if (req.params.bookId === null) {
          return res.send(404).send({ success: false, message: 'No book selected' });
        }
        if (!book) {
          return res.status(404).send({ message: 'Book does not exist in this database' });
        }
        return book
          .updateAttributes(req.body, {
            fields: Object.keys(req.body)
          })
          .then(() =>
            res.status(202).send({
              message: `${book.title} has been updated`,
              Title: book.title,
              Author: book.author,
              Quantity: book.quantity,
              Category: book.category,
              Description: book.description,
              Image: book.bookimage
            }))
          .catch((error) => {
            res.status(400).send({ success: false, error });
          });
      })
      .catch(error => res.status(400).send({ success: false, error }));
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
  // destroybooks(req, res) {
  //   if (req.params.bookId === 'undefined') {
  //     return res.status(404).send({ success: false, message: 'Book not found' });
  //   }
  //   return Books
  //     .findById({
  //       where: {
  //         id: req.params.bookId,
  //       },
  //     })
  //     .then((book) => {
  //       if (!book) {
  //         return res.status(404).send({ success: false, message: 'Book not found' });
  //       }
  //       book.destroy();
  //       return res.status(200).send({ success: true, message: 'Book successfully deleted' });
  //     })
  //     .catch(() => res.status(400).send({ success: false, message: 'Enter valid inputs!' }));
  // },

  /**
   * Route: GET: /books
   * @description returns a list of all books
   * @param {any} req
   * @param {any} res
   * @returns {any} books
   * @memmberOf BookController
   */
  getAllBooks(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 3;
    return Books.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    })
      .then((books) => {
        if (books.count === 0) {
          res.json({ error: 'Empty', message: 'There are no books present in the database' });
        } else {
          res.status(200).send({
            books: books.rows,
            pagination: paginationfunc(offset, limit, books)
          });
        }
      })
      .catch(error => res.status(501).send(error.message));
  }
};
