const jwt = require('jsonwebtoken');

const UserController = require('../controllers').User;
const BooksController = require('../controllers').Books;




module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Hello Books!',
    }));


    app.post('/api/users/signup', UserController.create);
    app.post('/api/users/signin', UserController.signin);
    app.use(function(req, res, next) {

        // check header or url parameters or post parameters for token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, 'superSecret', function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
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

    app.post('/api/books', BooksController.create);
    app.put('/api/books/:bookId', BooksController.update);
    app.get('/api/books/', BooksController.getAllBooks);
    app.post('/api/users/:userId/books', UserController.loanbook);
    app.get('/api/users/:userId/books?returned=false', UserController.getborrowedlist);
    app.put('/api/users/:userId/books', UserController.returnbook);
};