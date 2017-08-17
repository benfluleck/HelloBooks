import jwt from 'jsonwebtoken';

import controller from '../controllers';

const UserController = controller.User;
const BooksController = controller.Books;
const UserBooksController = controller.UserBooks;

export default (app) => {
 app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to the Hello Books!',
 }));

 app.post('/api/users/signup', UserController.create);
 app.post('/api/users/signin', UserController.signin);
 app.use((req, res, next) => {
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
 app.post('/api/books', BooksController.create);
 app.put('/api/books/:bookId', BooksController.update);
 app.get('/api/books/', BooksController.getAllBooks);
 app.get('/api/users/:userId/books', UserBooksController.getborrowerslist);
 app.post('/api/users/:userId/books', UserBooksController.loanbook);
 app.put('/api/users/:userId/books', UserBooksController.returnbook);
};