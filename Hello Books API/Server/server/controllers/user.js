const User = require('../models').User;

const jwt = require('jsonwebtoken');
const json = require('json');

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
    }



};