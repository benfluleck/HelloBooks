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
     return res.status(409).send({ success: false, messsage: 'This book has been borrowed', bookfound });
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
          res.status(200).send({ success: true, message: `${updateBook.title} succesfully loaned` });
         })
         .catch((error) => {
          res.status(400).send({ Errors: Helper.errorArray(error) });

         });
       })
       .catch((error) => {
        res.status(400).send({ success: false, message: ` ${error.message}` });
       });
     })
     .catch(() => {
      res.status(400).send({ success: false, message: 'Oops! Check entered UserId or BookId and ensure its valid input' });
     });
   })
   .catch((error) => {
    //console.log(error);
    res.status(400).send({ success: false, message: ` ${error.message}` });
   });
 },

 //  loanbook(req, res) {
 //   // First checks if book has been borrowed and not returned
 //   return UserBooks
 //    .findOne({
 //     where: {
 //      userid: req.params.userId,
 //      bookid: req.body.bookid,
 //      return_status: false,
 //     },
 //     include: [
 //      { model: Books, as: 'book', required: true },
 //     ],
 //    }).then((foundBorrow) => {
 //     /**
 //      * If book has been borrowed before and not returned,
 //      * User cannot borrow same book again.
 //      */
 //     if (foundBorrow) {
 //      return res.status(409).send({ success: false, messsage: 'Conflict! Book borrowed already', foundBorrow });
 //     }
 //     // Else, user is eligible to borrow book
 //     return UserBooks
 //      .create({
 //       userid: req.params.userId,
 //       bookid: req.body.bookid,
 //       return_date: req.body.date

 //      })
 //      .then(() => {
 //       // Ensures book is available and not borrowed out.
 //       Books
 //        .findOne({
 //         where: {
 //          id: req.body.bookid,
 //         },
 //        })
 //        .then((foundBorrowedBook) => {
 //         // If book is borrowed out, then No book to borrow
 //         if (!foundBorrowedBook || foundBorrowedBook.quantity === 0) {
 //          return res.status(404).send({ success: false, message: 'Book not found' });
 //         }
 //         /**
 //          * But if book is available, User can borrow book
 //          * with the count decreased by one
 //          */
 //         return foundBorrowedBook
 //          .update({
 //           quantity: foundBorrowedBook.quantity - 1,
 //          })
 //          .then((updatedBorrowedBook) => {
 //           res.status(200).send({ success: true, message: `${updatedBorrowedBook.title} succesfully borrowed`, updatedBorrowedBook });
 //          })
 //          .catch((error) => {
 //           res.status(400).send({ success: false, message: `Oops! something happened, ${error.message}` });
 //          });
 //        })
 //        .catch((error) => {
 //         res.status(400).send({ success: false, message: `Oops! something happenned ${error.message}` });
 //        });
 //      })
 //      .catch(() => { res.status(400).send({ success: false, message: 'Oops! Check entered UserId or BookId and ensure its valid input' }); });
 //    })
 //    .catch((error) => {
 //     res.status(400).send({ success: false, message: `drOops! something happened, ${error.message}` });
 //    });
 //  },









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