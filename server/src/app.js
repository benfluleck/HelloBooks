import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes';
import authenticate from './controllers/middleware/authenticate';

dotenv.config();
const app = express();


const authenticateRoutes = authenticate.authenticate;

app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/apidocs', express.static(path.join(__dirname, '../../apidocs')));
app.use(express.static(path.join(__dirname, '../../client/dist/app')));

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-PINGOTHER, Origin, X-Requested-With,' +
     'Content-Type, Accept, x-access-token'
  );
  next();
});

app.use('/api/v1', authenticateRoutes, routes);

app.get('/apidocs', (req, res) => {
  res.sendFile(path.join(__dirname, '../../apidocs/index.html'));
});

app
  .get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../../client/dist/app/index.html')));

export default(app);
