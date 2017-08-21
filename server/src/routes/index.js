import jwt from 'jsonwebtoken';
import express from 'express';
import controller from '../controllers';

const Router = express.Router();
const UserController = controller.User;
const BooksController = controller.Books;
const UserBooksController = controller.UserBooks;


/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Welcome to Hello Books
 *     description: Returns the homepage
 *     responses:
 *       200:
 *         description: Welcome to Hello Books Library
 */
Router.get('/', (req, res) => res.status(200).send({
 message: 'Welcome to the Hello Books!',
}));
/**
 * @swagger
 * definition:
 *   SignIn:
 *     properties:
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       password_confirmation:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       username:
 *         type: string
 *         default: Benny
 *       password:
 *         type: string
 *         default: benny
 */

/**
 * @swagger
 * definitions:
 *   Book:
 *     properties:
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       category:
 *         type: string
 *       description:
 *         type: string
 *       quantity:
 *         type: integer
 *       image:
 *         type: string
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users, Register & Authentication
 *     description: This enables the User to sign up
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SignIn'
 *     responses:
 *       200:
 *         description: User Successfully created
 *       400:
 *         description: Invalid Username, Password or Email
 */
Router.post('/users/signup', UserController.create);
Router.post('/users/signin', UserController.signin);
Router.use((req, res, next) => {
 // check header or url parameters or post parameters for token
 const token = req.body.token || req.query.token || req.headers['x-access-token'];

 // decode token
 if (token) {
  // verifies secret and checks exp
  jwt.verify(token, 'superSecret', (err, decoded) => {
   if (err) {
    return res.json({ success: false, message: 'Failed to authenticate token.' });
   }
   // if everything is good, save to request for use in other routes
   req.decoded = decoded;
   next();
  });
 } else {
  // if there is no token
  // return an error
  return res.status(403).send({
   success: false,
   message: 'No token provided. Did you specify your secret message'
  });
 }
});
// if  user selects a different route and is not authenticated redirect him
// number of copies
//admin
Router.post('/books', BooksController.create);
Router.put('/books/:bookId', BooksController.update);
Router.get('/books/', BooksController.getAllBooks);
Router.get('/users/:userId/books', UserBooksController.getborrowerslist);
Router.post('/users/:userId/books', UserBooksController.loanbook);
Router.put('/users/:userId/books', UserBooksController.returnbook);

export default (Router)