import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import swaggerJSDoc from 'swagger-jsdoc';


// Set up the express app
const app = express();
var swaggerDefinition = {
 info: {
  title: 'Node Swagger API',
  version: '1.0.0',
  description: 'Demonstrating how to describe a RESTful API with Swagger',
 },
 basePath: '/',
};


const options = {
 // import swaggerDefinitions
 swaggerDefinition: swaggerDefinition,
 // path to the API docs
 apis: ['./routes/*.js'],
 basePath: '/api/v1',
 securityDefinitions: {
  jwt: {
   type: 'apiKey',
   name: 'Authorization',
   in: 'x-access-token'
  }
 },
 security: [
  { jwt: [] }
 ]

};

const swaggerSpec = swaggerJSDoc(options);

// Log requests to the console.
app.use(logger('dev'));


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
//app.use('/api/v1', routes);
// serve swagger
app.get('/hellobooks.json', (req, res) => {
 res.setHeader('Content-Type', 'application/json');
 res.send(swaggerSpec);
});

app.get('*', (req, res) => res.status(404).send({
 message: 'This is a wrong route.',
}));

export default app;