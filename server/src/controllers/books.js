import models from '../models';
import paginationFunc from '../controllers/middleware/pagination';


const { Categories, Books, UserBooks } = models;

export default {
  /**
   * Route: POST: /books
   * @description creates a book
   * @param {any} req
   * @param {any} res
   * @returns {any} book
   * @memmberOf BookController
  */
  createBook(req, res) {
    Categories.findOne({
      where: {
        id: req.body.categoryId
      }
    }).then((foundCategory) => {
      if (!foundCategory) {
        return res.status(404)
          .send({ message: 'Category does not exist' });
      }
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
        Books.create({
          title: req.body.title,
          author: req.body.author,
          quantity: req.body.quantity,
          categoryId: req.body.categoryId,
          description: req.body.description,
          bookImage: req.body.bookImage || process.env.DEFAULT_BOOK_COVER
        })
          .then((createdBook) => {
            createdBook.getCategory()
              .then((category) => {
                const newBook = {
                  title: createdBook.title,
                  category: category.categoryName
                };
                res.status(201).send({
                  message: `${newBook.title} has been added to the library, Category: ${newBook.category}` });
              });
          })
          .catch(error => res.status(400).send(error.message));
      });
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
  updateBook(req, res) {
    return Books.findById(req.params.bookId)
      .then((book) => {
        if (req.params.bookId === null) {
          return res.send(404).send({ success: false, message: 'No book selected' });
        }
        if (!book) {
          return res.status(404).send({ message: 'Book does not exist in this database' });
        }
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
          return book
            .updateAttributes(req.body, {
              fields: Object.keys(req.body)
            })
            .then((createdBook) => {
              createdBook.getCategory()
                .then((category) => {
                  const newBook = {
                    title: createdBook.title,
                    category: category.categoryName
                  };
                  res.status(200).send({
                    message: `${newBook.title} has been updated`,
                    Title: createdBook.title,
                    Author: createdBook.author,
                    Quantity: createdBook.quantity,
                    Description: createdBook.description,
                    Category: newBook.category,
                    BookCover: newBook.bookImage
                  });
                });
            });
        })
          .catch(error => res.status(400).send(error.message));
      });
  },


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
            pagination: paginationFunc(offset, limit, books)
          });
        }
      })
      .catch(error => res.status(501).send(error.message));
  },
  searchBooks(req, res) {
    const searchQuery = req.query.searchTerm || null;
    const categoryId = req.query.categoryId || null;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 8;
    const whereSearch = {
      $or: [{
        title:
        { $iLike: `%${searchQuery}%` }
      }, {
        author:
        { $iLike: `%${searchQuery}%` }
      }]
    };
    if (categoryId) {
      whereSearch.$and = [{ categoryId }];
    }
    if (searchQuery === null) {
      return res.status(400)
        .send({ message: 'Please enter your search criteria' });
    }
    if (searchQuery.length > 0) {
      Books
        .findAndCountAll({
          where: whereSearch,
          include: [{
            model: Categories,
            as: 'category',
            attributes: ['categoryName'],
            paranoid: false
          }],
          limit,
          offset
        })
        .then((books) => {
          const booksFound = {
            books: books.rows,
            pagination: paginationFunc(offset, limit, books)
          };
          if (books.rows.length === 0) {
            return res.status(404)
              .send({ message: 'Sorry no books match your search criteria' });
          }
          return res.status(200).send({ success: true, booksFound });
        })
        .catch(error => res.status(500).send(error.message));
    }
  },

  /** displays one book
     * @param {object} req HTTP request object
     * @param {object} res  HTTP response object
     * @returns {object} book
     */
  viewBook(req, res) {
    const bookId = parseInt(req.params.bookId);
    if (isNaN(bookId)) {
      return res.status(400).send({
        message: 'Please enter a valid bookId'
      });
    }
    Books.findById(bookId, {
      include: [{
        model: Categories,
        as: 'category',
        attributes: ['categoryName'],
      }]
    })
      .then((book) => {
        if (!book) {
          return res.status(404)
            .send({ message: 'This book does not exist in the library' });
        }
        const selectedBook = { success: true, book };
        res.status(200).send(selectedBook);
      })
      .catch(error => res.status(500).send(error.message));
  },

  deleteBook(req, res) {
    const bookId = parseInt(req.params.bookId);
    if (isNaN(bookId)) {
      return res.status(400).send({
        message: 'Please enter a valid bookId'
      });
    }
    Books.findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({
            message: 'Book does not exist',
          });
        }
        UserBooks.findOne({
          where: {
            $and: [{
              bookId
            }, { returnStatus: false }]
          }
        })
          .then((borrowedBooks) => {
            if (borrowedBooks) {
              return res.status(409).send({
                message: 'You can\'t delete this ook while there is a copy still out on loan'
              });
            }
            book
              .destroy()
              .then(() => res.status(200)
                .send({ message: `${book.title}  has been deleted` }));
          });
      })
      .catch(error => res.status(500).send(error.message));
  },


};
