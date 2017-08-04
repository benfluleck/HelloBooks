const User = require('./user');
const Books = require('../models').Books;



module.exports = {
    create(req, res) {
        if (User === null) {
            return res.json({ success: false, message: 'You need to be logged in.' });
        } else {
            return Books
                .create({
                    book_title: req.body.book_title,
                    books_author: req.body.books_author,
                    category: req.body.category,
                })
                .then(Books => res.status(201).send(Books))
                .catch(error => res.status(400).send(error));
        }

    },
    //.updateAttributes(req.body, { fields: Object.keys(req.body) })
    update(req, res) {
        return Books
            .findById(req.params.bookId)
            .then(book => {
                if (!book) {
                    return res.status(404).send({
                        message: 'Book does not exist in this database',
                    });
                }
                return book
                    .updateAttributes(req.body, { fields: Object.keys(req.body) })
                    .then(() => res.status(200).send(book)) // Send back the updated book
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    getAllBooks(req, res) {
        return Books
            .all()
            .then(book => res.status(200).send(book))
            .catch(error => res.status(400).send(error));
    },

    returnBooks(req, res) {
        return Books
            .find;


    }



};