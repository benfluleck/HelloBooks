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
Router.get('/', (req, res) => res.status(200).send({message: 'Welcome to the Hello Books!'}));
/**
 * @swagger
 * definition:
 *   SignIn:
 *     properties:
 *       firstname:
 *         type: string
 *         default: 'Ben'
 *       lastname:
 *         type: string
 *         default: 'Ogidan'
 *       username:
 *         type: string
 *         default: 'Benny'
 *       email:
 *         type: string
 *         default: 'Ogidan@yahoo.com'
 *       password:
 *         type: string
 *         default: 'benny'
 *       password_confirmation:
 *         type: string
 *         default: 'benny'
 */
/**
 * @swagger
 * definition:
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
 * definition:
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
/**
 * @swagger
 * /users/signin:
 *   post:
 *     tags:
 *       - Users, Register & Authentication
 *     description: Signs in a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Bad Username, Password or Email
 */
Router.post('/users/signin', UserController.signin);
//Router.post('/api/auth/reset_password_request',UserController.reset_password)
Router.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token return an error
    return res
      .status(403)
      .send({success: false, message: 'No token provided. Did you specify your secret message'});
  }
});
// if  user selects a different route and is not authenticated redirect him
// number of copies admin

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     description: Adds a new book type  with a seperate quantity
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *       - name: x-access-token
 *         in: header
 *         description: Header for token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Invalid Tokens
 */
Router.post('/books', BooksController.create);

/**
 * @swagger
 * /books/{bookId}:
 *   put:
 *     tags:
 *       - Books
 *     description: Edit a Book stored in the library
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: ID of the Book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: book
 *         description: Book object with updated information
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *       - name: x-access-token
 *         in: header
 *         description: Header for token
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Successfully edited
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 */

Router.put('/books/:bookId', BooksController.update);

/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     description: Returns all Books
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: Header for token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of Books in the database
 *         schema:
 *           $ref: '#/definitions/Book'
 */
Router.get('/books/', BooksController.getAllBooks);

/**
 * @swagger
 * /users/{userId}/books:
 *   post:
 *     tags:
 *       - Loan Books
 *     description: Loan a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User
 *         in: path
 *         required: true
 *         type: integer
 *       - name: return_date
 *         description: Return Date of the book
 *         in: path
 *         required: true
 *         type: date
 *       - name: bookId
 *         description: ID of Book to Borrow
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - bookId
 *           properties:
 *             bookId:
 *               type: integer
 *
 *       - name: x-access-token
 *         in: header
 *         description: Header for Token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Book Successfully borrowed
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 */
Router.post('/users/:userId/books', UserBooksController.loanbook);
/**
 * @swagger
 * /users/{userId}/books:
 *   put:
 *     tags:
 *       - Loan Books
 *     description: Return a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: Book Loaned
 *         in: body
 *         required: true
 *         type: integer
 *       - name: x-access-token
 *         in: header
 *         description: Header for Token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Book Successfully returned
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book does not exist
 */

Router.put('/users/:userId/books', UserBooksController.returnbook);
/**
 * @swagger
 * /users/{userId}/books:
 *   get:
 *     tags:
 *       - Loan Books
 *     description: Returns a list of all Books borrowed but not returned by a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: returned
 *         in: query
 *         required: true
 *         type: boolean
 *         default: false
 *       - name: x-access-token
 *         in: header
 *         description: Header for Token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of Books
 *         schema:
 *           $ref: '#/definitions/Book'
 */
Router.get('/users/:userId/books', UserBooksController.getborrowerslist);
export default(Router)
