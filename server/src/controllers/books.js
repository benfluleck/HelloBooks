import models from '../models';
import Helper from '../Helper/helper';

const Books = models.Books;

/**
 *
 */
export default {
  create(req, res) {
    // const title = req.body.title;
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
          const pagination = {
            page: Math.floor(offset / limit) + 1,
            pageCount: Math.ceil(books.count / limit),
            pageSize: books.rows.length,
            totalCount: books.count
          };
          res
            .status(200)
            .send({
              books: books.rows,
              pagination
            });
        }
      })
      .catch(error => res.status(501).send(error.message));
  }

};
