'use strict';

var User = require('./user');
var Books = require('../models').Books;

module.exports = {
    create: function create(req, res) {
        if (User === null) {
            return res.json({ success: false, message: 'You need to be logged in.' });
        } else {
            return Books.create({
                book_title: req.body.book_title,
                books_author: req.body.books_author,
                category: req.body.category
            }).then(function (Books) {
                return res.status(201).send(Books);
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        }
    },

    //.updateAttributes(req.body, { fields: Object.keys(req.body) })
    update: function update(req, res) {
        return Books.findById(req.params.bookId).then(function (book) {
            if (!book) {
                return res.status(404).send({
                    message: 'Book does not exist in this database'
                });
            }
            return book.updateAttributes(req.body, { fields: Object.keys(req.body) }).then(function () {
                return res.status(200).send(book);
            }) // Send back the updated book
            .catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    getAllBooks: function getAllBooks(req, res) {
        return Books.all().then(function (book) {
            return res.status(200).send(book);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    }
};