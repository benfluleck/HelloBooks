import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('production'));


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.


app.get('*', (req, res) => res.status(200).send({
 message: 'This is just a test.',
}));

export default app;