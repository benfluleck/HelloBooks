const User = require('../models').User;
const Books = require('../models').Books;

const jwt = require('jsonwebtoken');


module.exports = {
    create(req, res) {
        return User
            .create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email

            })
            .then(User => res.status(201).send(User))
            .catch(error => res.status(400).send(error));
        /* User.create = (err) => {
            if (err) throw err;

            console.log('User saved successfully');
        }; */
    },

    // Sign In route build
    signin(req, res) {
        return User
            .findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password
                },
            })
            .then(User => {
                    if (!User) {
                        res.json({ success: false, message: 'Authentication failed. User not found.' });

                    } else if (User) {

                        // check if password matches
                        if (User.password != req.body.password) {
                            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                        } else {
                            const user = { name: User.username, password: User.password };
                            const token = jwt.sign(user, 'superSecret', {
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
                }

            )
    },

    loanbook(req, res) {
        return Books
            .findOne({
                where: {
                    book_title: req.body.title
                },
            })
            .then(book => {

                if (book) {
                    book.updateAttributes({
                            status: true,
                            userid: req.params.userId,

                        })
                        .then(book => res.status(201).send(book))
                        .catch(error => res.status(400).send(error));
                }
                return book

            })

    },

    getborrowedlist(req, res) {
        return Books
            .findAll({
                where: {
                    status: true,

                },


            })
            .then(book => res.status(201).send(book))
            .catch(error => res.status(400).send(error));

    },

    returnbook(req, res) {
        return Books
            .findOne({
                where: {
                    book_title: req.body.title,
                    userid: req.params.userId,
                },
            })
            .then(book => {
                if (!book) {
                    return res.status(404).send({
                        message: 'Book does not exist in this database',
                    });
                }
                return book
                    .updateAttributes({
                        status: false,
                    })
                    .then(() => res.status(200).send(book)) // Send back the updated book
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

};