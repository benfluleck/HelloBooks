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
Router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to the Hello Books!' }));
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
Router.post('/users/signin', UserController.signin);

Router.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token return an error
    return res
      .status(403)
      .send({ success: false, message: 'No token provided. Did you specify your secret message' });
  }
});

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
 *         description: Header for token which uses jwt authentication
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
Router.get('/users/:userId/books', UserBooksController.getborrowerslist);

// Router.delete('books/:bookId', BooksController.destroybooks);
// Router.put('/users/:userId', UserController.updateUserInfo);

export default(Router);
