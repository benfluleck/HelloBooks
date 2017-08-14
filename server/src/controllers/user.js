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
 create(req, res) {
  // console.log(req.body, '++++++++++')
  return User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
    email: req.body.email

   }).then(user => res.json({ success: true, name: user.firstname, username: user.username }))
   .catch(error => {


    res.status(400).send(error.message);

   });

 },



 // if (error.message === "SequelizeValidationError") {
 //  res.status(400).send(error);
 //  res.json({
 //   user: user.build(req.body),
 //   error: error.errors,
 //  });
 // Sign In route build
 signin(req, res) {
  return User.findOne({

   where: {
    username: req.body.username,

   }
  }).then((user) => {

   if (!user) {
    // res.status(403).send();
    res.json({ success: false, message: 'Bad Authentication failed. User not found.' });
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
    res.json({ success: false, message: 'Password error.' });
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
   if (userbook.return_status = false)
    userbook.return_status = true;
   userbook.save;
   return res.status(201).send(userbook);
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