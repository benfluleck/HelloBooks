'use strict';

var User = require('../models').User;
var Books = require('../models').Books;
var UserBooks = require('../models').UserBooks;
//import faker from 'faker';

var jwt = require('jsonwebtoken');

module.exports = {
    create: function create(req, res) {
        return User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }).then(function (User) {
            return res.status(201).send(User);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
        /* User.create = (err) => {
            if (err) throw err;
              console.log('User saved successfully');
        }; */
    },


    // Sign In route build
    signin: function signin(req, res) {
        return User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function (User) {
            if (!User) {
                //res.status(403).send();
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (User) {

                // check if password matches
                if (User.password != req.body.password) {
                    //res.status(403).send();
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    var user = { name: User.username, password: User.password };
                    var token = jwt.sign(user, 'superSecret', {
                        expiresIn: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token, You are now logged in!',
                        token: token
                    });
                }
            }
        });
    },
    loanbook: function loanbook(req, res) {
        return UserBooks.create({
            userid: req.params.userId,
            bookid: req.body.book_id,
            return_date: req.body.date,
            return_status: false
        })
        // status in user table will need to be updated
        //if book id does not exist
        .then(function (User) {
            return res.status(201).send(User);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    getborrowerslist: function getborrowerslist(req, res) {
        return UserBooks.findAll({ where: { userid: req.params.userId } }).then(function (book) {
            return res.status(201).send(book);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },
    returnbook: function returnbook(req, res) {
        return UserBooks.find({
            where: {
                bookid: req.body.book_id,
                userid: req.params.userId
                //return_status: req.query.isreturnbool
            }
        }).then(function (book) {
            if (!book) {
                return res.status(404).send({
                    message: 'Book does not exist in this database'
                });
            }
            return book.update({
                return_status: true
            }).then(function () {
                return res.status(200).send(book);
            }) // Send back the updated book
            .catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    }
};