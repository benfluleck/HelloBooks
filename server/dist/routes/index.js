'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _fieldValidations = require('../controllers/middleware/fieldValidations');

var _fieldValidations2 = _interopRequireDefault(_fieldValidations);

var _authenticate = require('../controllers/middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _nullValidation = require('../controllers/middleware/nullValidation');

var _nullValidation2 = _interopRequireDefault(_nullValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();
var UserController = _controllers2.default.User;
var BooksController = _controllers2.default.Books;
var UserBooksController = _controllers2.default.UserBooks;
var authorization = _authenticate2.default.authenticate;

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
Router.get('/', function (req, res) {
  return res.status(200).send({ message: 'Welcome to the Hello Books!' });
});
/**
 * @swagger
 * definition:
 *  SignIn:
 *   properties:
 *    firstname:
 *      type: string
 *      default: 'Ben'
 *    lastname:
 *      type: string
 *      default: 'Ogidan'
 *    username:
 *      type: string
 *      default: 'Benny'
 *    email:
 *      type: string
 *      default: 'Ogidan@yahoo.com'
 *    password:
 *      type: string
 *      default: 'benny'
 *    password_confirmation:
 *      type: string
 *      default: 'benny'
 */
/**
 * @swagger
 * definition:
 *  Login:
 *   properties:
 *    username:
 *     type: string
 *     default: Benny
 *    password:
 *     type: string
 *     default: benny
 */

/**
 * @swagger
 * definition:
 *  Book:
 *   properties:
 *     title:
 *      type: string
 *     author:
 *      type: string
 *     category:
 *      type: string
 *     description:
 *      type: string
 *     quantity:
 *      type: integer
 *     book_image:
 *      type: string
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
 *      201:
 *       description: User Successfully created
 *      400:
 *       description: Invalid Username, Password or Email
 *      200:
 *       Email is not the right format
 *      404:
 *       Password and username do not match
 */
Router.post('/auth/users/signup', _fieldValidations2.default, _nullValidation2.default, UserController.create);
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
 *       '200':
 *         description: Successfully login
 *       '400':
 *         description: Bad Username, Password or Email
 *       '401':
 *         description: Authorization information is missing or invalid.
 *       '404':
 *         description: A user with the specified ID was not found.
 *       '5XX':
 *         description: Error with Token.
 */
Router.post('/auth/users/signin', _nullValidation2.default, UserController.signin);

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
 *       '201':
 *         description: Successfully created
 *       '400':
 *         description: All fields are required
 *       '401':
 *         description: Invalid request.
 *       '5XX':
 *         description: Error with Token.
 */
Router.post('/books', authorization, _nullValidation2.default, BooksController.create);
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
 *       - name: bookid
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
 *       202:
 *         description: Successfully creation
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book not found
 *       '5XX':
 *         description: Error with Token.
 */
Router.put('/books/:bookId', authorization, _nullValidation2.default, BooksController.update);
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
 *         description: Header for token which uses jwt authentication
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of Books in the database
 *         schema:
 *           $ref: '#/definitions/Book'
 */
Router.get('/books/', authorization, BooksController.getAllBooks);
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
 *       - name: offset
 *         description: offset for pagination for books
 *         in: query
 *         type: integer
 *         default: 0
 *       - name: limit
 *         in: query
 *         type: integer
 *         default: 3
 *       - in: body
 *         name: loan with return_date
 *         description: Loan book with Return date specified
 *         schema:
 *           type: object
 *           required:
 *              - return_date
 *           properties:
 *              return_date:
 *                type: string
 *                format: date
 *                description: Return date for the book
 *              bookid:
 *                type: integer
 *                description: ID of Book to Borrow
 *       - name: x-access-token
 *         in: header
 *         description: Header for Token
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Book succesfully loaned
 *       '404':
 *         description: There are no books present in the database
 *       '5XX':
 *         description: Error with Token.
 */
Router.post('/users/:userId/books', authorization, UserBooksController.loanbook);
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
 *       - name: bookid
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
 *       201:
 *         description: Book Successfully lreturned
 *         schema:
 *           $ref: '#/definitions/Book'
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Book does not exist
 */
Router.put('/users/:userId/books', authorization, UserBooksController.returnbook);
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
 *       - name: userId
 *         description: ID of the User
 *         in: path
 *         required: true
 *         type: integer
 *       - name: returned
 *         in: query
 *         required: true
 *         type: boolean
 *         default: false
 *       - name: offset
 *         in: query
 *         type: integer
 *         default: 0
 *       - name: limit
 *         in: query
 *         type: integer
 *         default: 3
 *       - name: x-access-token
 *         in: header
 *         description: Header for Token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of borrowed books successfully displayed
 *         schema:
 *           $ref: '#/definitions/Book'
 */
Router.get('/users/:userId/books', authorization, UserBooksController.getborrowerslist);

// Router.delete('books/:bookId', BooksController.destroybooks);
// Router.put('/users/:userId', UserController.updateUserInfo);

exports.default = Router;