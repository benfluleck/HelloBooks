import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import models from '../models';

const User = models.User;
const UserBooks = models.UserBooks;


export default {
 /**
  * Create a new user
  * Route: POST: /users
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {void|Response} response object or void
  */
 create(req, res, err) {
  // console.log(req.body, '++++++++++')

  return User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
    email: req.body.email
   })
   .then(user => {
    if (!user) {
     res.json({ message: 'Error adding user' });

    } else {
     res.json({ success: true, name: user.firstname, username: user.username });
    }
   })
   .catch(error => {
    res.status(400).send(error.message);

   });

 },


 signin(req, res) {
  return User.findOne({

   where: {
    username: req.body.username,

   }
  }).then((user) => {

   if (!user) {

    return res.json({ success: false, message: `${req.body.username} does not exist` });

    // res.status(403).send();

   } else if (bcrypt.compareSync(req.body.password, user.password)) {
    const Userjwt = { name: user.username, password: user.password };
    const token = jwt.sign(Userjwt, 'superSecret', {
     expiresIn: 1440 // expires in 24 hours
    });

    // return the information including token as JSON
    res.json({
     success: true,
     message: 'Enjoy your token, You are now logged in!',
     token
    });
   } else {
    res.json({ success: false, message: 'Incorrect Password Entered' });
   }
  }).catch(error => res.status(400).send(error.message));
 },

 loanbook(req, res) {
  return UserBooks.create({
    userid: req.params.userId,
    bookid: req.body.bookid,
    return_date: req.body.date,
   }
   // status in user table will need to be updated
   // if book id does not exist
  ).then((userbook) => {
   if (!userbook.userid) {
    return res.json({ success: false, message: `${userbook.userid} does not exist` });
   } else if (!userbook.bookid) {
    return res.json({ success: false, message: `${userbook.bookid} does not exist` });
   } else if (req.body.date < Date.now()) {
    return res.json({ success: false, message: `The date is in the past` });
   } else {
    if (userbook.return_status == false) {
     userbook.return_status = true;
     userbook.save;
     return res.json({ message: `${userbook.bookid} has been returned` });
    }
   }
  }).catch(error => res.status(400).send(error));
 },

 getborrowerslist(req, res) {
  return UserBooks.findAll({ where: { userid: req.params.userId, return_status: req.query.returned } })
   .then(book => res.status(200).send(book)).catch(error => res.status(400).send(error));
 },

 returnbook(req, res) {

  return UserBooks.find({
   where: {
    bookid: req.body.bookid,
    userid: req.params.userId,

   }
  }).then((book) => {
   if (!book) {
    return res.status(404).send({
     message: 'Book does not exist in this database'
    });
   }

   return book.update({
    return_status: true
   }).then(() => res.status(200).send(book) // Send back the updated book
   ).catch(error => res.status(400).send(error));
  }).catch(error => res.status(400).send(error));
 }

};