import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes';
import authenticate from './controllers/middleware/authenticate';

dotenv.config();
const app = express();
const swaggerDefinition = {
  info: {
    title: 'Hello Books API - Benny Ogidan',
    version: '1.0.0',
    description: 'API for a Library database with Swagger'
  },
  host: 'localhost:5000',
  basePath: '/api/v1'
};

const authenticateRoutes = authenticate.authenticate;

const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/dist/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, x-ac' +
      'cess-token');
  next();
});

app.use(express.static(path.join(__dirname, '../api-docs/')));


app.get('/hellobooks.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api/v1', routes, authenticateRoutes);

app.get('*', (req, res) => res.status(404).send({ message: 'You are at a wrong route' }));

export default(app);
