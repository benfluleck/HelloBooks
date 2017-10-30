import express from 'express';
import controller from '../controllers';
import fieldValidationMiddleware from '../controllers/middleware/fieldValidations';
import nullvalidationMiddleware from '../controllers/middleware/nullValidation';

const Router = express.Router();
const UserController = controller.User;
const BooksController = controller.Books;
const UserBooksController = controller.UserBooks;


Router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to the Hello Books!' }));

Router.get('/auth/books/recentbooks', BooksController.getAllBooks);

Router.post('/auth/users/signup', fieldValidationMiddleware, nullvalidationMiddleware, UserController.create);

Router.post('/auth/users/signin', nullvalidationMiddleware, UserController.signin);


Router.post('/books', nullvalidationMiddleware, BooksController.create);

Router.put('/books/:bookId', nullvalidationMiddleware, BooksController.update);

Router.get('/books/', BooksController.getAllBooks);

Router.post('/users/:userId/books', UserBooksController.loanbook);

Router.put('/users/:userId/books', UserBooksController.returnbook);

Router.get('/users/:userId/books', UserBooksController.getborrowerslist);

// Router.delete('books/:bookId', BooksController.destroybooks);
// Router.put('/users/:userId', UserController.updateUserInfo);

export default(Router);
