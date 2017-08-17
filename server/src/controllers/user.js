import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import models from '../models';
import Helper from '../Helper/helper';


const User = models.User;
const UserBooks = models.UserBooks;
const Books = models.Books;


export default {
 /**
  * Create a new user
  * Route: POST: /users
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {void|Response} response object or void
  */
 create(req, res) {

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
    //if(error.message ==="Validation Error")
    error.errors.map(error => {
     if (error.type === "notNull Violation") {
      res.json({
       error: 'not Null',
       message: 'You have not defined one or more of your values'
      });
     }
    });
    // console.log(error.message);
    //res.status(400).send(error);

   });

 },


 signin(req, res) {
  return User.findOne({

   where: {
    username: req.body.username,

   }
  }).then((user) => {

   if (!user) {

    return res.json({ success: false, message: `${req.body.username} does not exist in the database` });

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

};