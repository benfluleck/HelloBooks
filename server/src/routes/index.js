import express from 'express';
import controller from '../controllers';
import fieldValidationMiddleware from '../controllers/middleware/fieldValidations';
import authenticate from '../controllers/middleware/authenticate';
import nullvalidationMiddleware from '../controllers/middleware/nullValidation';

const Router = express.Router();
const UserController = controller.User;
const BooksController = controller.Books;
const UserBooksController = controller.UserBooks;
const authorization = authenticate.authenticate;


Router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to the Hello Books!' }));

Router.post('/auth/users/signup', fieldValidationMiddleware, nullvalidationMiddleware, UserController.create);

Router.post('/auth/users/signin', nullvalidationMiddleware, UserController.signin);


Router.post('/books', authorization, nullvalidationMiddleware, BooksController.create);

Router.put('/books/:bookId', authorization, nullvalidationMiddleware, BooksController.update);

Router.get('/books/', authorization, BooksController.getAllBooks);

Router.post('/users/:userId/books', authorization, UserBooksController.loanbook);

Router.put('/users/:userId/books', authorization, UserBooksController.returnbook);

Router.get('/users/:userId/books', authorization, UserBooksController.getborrowerslist);

// Router.delete('books/:bookId', BooksController.destroybooks);
// Router.put('/users/:userId', UserController.updateUserInfo);

export default(Router);
