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

app.use('/apiDocs', express.static(path.join(__dirname, '../../apiDocs/')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, x-ac' +
      'cess-token');
  next();
});


app.use('/api/v1', routes, authenticateRoutes);

app.get('*', (req, res) => res.status(404).send({ message: 'You are at a wrong route' }));

export default(app);
