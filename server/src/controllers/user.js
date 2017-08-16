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
 create(req, res, err) {

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

 loanbook(req, res) {
  return UserBooks
   .findOne({
    where: {
     userid: req.params.userId,
     bookid: req.body.bookid,
     return_status: false,

    },
    include: [
     { model: Books, as: 'book', required: true },
    ],
   }).then((bookfound) => {
    /**
     * Check if the book has been borrowed before,
     * User should borrow .
     */
    if (bookfound) {
     return res.status(405).send({ success: false, messsage: 'This book has already been borrowed by you', bookfound });
    }
    return UserBooks.create({
       userid: req.params.userId,
       bookid: req.body.bookid,
       return_date: req.body.date

      }
      // status in user table will need to be updated
      // if book id does not exist
     )
     .then(() => {
      Books
       .findOne({
        where: {
         id: req.body.bookid,
        },
       })
       .then((bookfound) => {
        // If book is borrowed out, then No book to borrow
        if (!bookfound || bookfound.quantity === 0) {
         return res.status(404).send({ success: false, message: 'Book not found or All copies of this book are gone' });
        }

        return bookfound
         .update({
          quantity: bookfound.quantity - 1,
         })
         .then((updateBook) => {
          res.status(200).send({ success: true, message: `${updateBook.title} succesfully loaned`, updateBook });
         })
         .catch((error) => {
          res.status(400).send({ Errors: Helper.errorArray(error) });

         });
       })
       .catch((error) => {
        res.status(400).send({ Errors: Helper.errorArray(error) });
       });
     })
     .catch(() => {
      res.status(400).send({ success: false, message: 'Check entered UserId or BookId and ensure its valid input' });
     });
   })
   .catch((error) => {
    //console.log(error);
    res.status(400).send({ success: false, message: ` ${error.message}` });
   });
 },



 getborrowerslist(req, res) {
  return UserBooks.findAll({
    where: {
     userid: req.params.userId,
     return_status: req.query.returned
    },
    include: [
     { model: Books, as: 'book', required: true },
    ],
   })
   .then(book => {
    if (book.length === 0) {
     return res.status(404).send({ success: false, message: 'You have no books on your loan list' });
    }
    res.status(200).send({
     book
    })
   })
   .catch(error => res.status(400).send(error.message));
 },

 returnbook(req, res) {
  return UserBooks
   .findOne({
    where: {
     bookid: req.body.bookid,
     userid: req.params.userId,
     return_status: true,
    },
    include: [
     { model: Books, as: 'book', required: true },
    ],
   }).then((book) => {
    if (book) {
     return res.status(409).send({ success: false, messsage: 'You have returned this book already', book });
    }

    return UserBooks
     .update({
      return_status: true,
      user_return_date: Date.now()
     }, {
      where: {
       userid: req.params.userId,
       bookid: req.body.bookid
      },
     })
     .then(() => {
      Books
       .findOne({
        where: {
         id: req.body.bookid,
        },
       }).then((bookfound) => {
        if (!bookfound) {
         return res.status(404).send({
          message: 'Book does not exist in this database'
         });
        }
        return bookfound
         .update({
          quantity: bookfound.quantity + 1,
         })
         .then((updatebook) => {
          res.status(200).send({ success: true, message: `${updatebook.title} has been returned`, updatebook });
         })
         .catch(error => res.status(400).send(error.message));

       })
       .catch(error => res.status(400).send(error.message));
     })
   }).catch(error => res.status(400).send(error.message));
 }
};