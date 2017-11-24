import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes';
import authenticate from './controllers/middleware/authenticate';
import { sendSurchargeJob } from './cron/index';



dotenv.config();
const app = express();


const authenticateRoutes = authenticate.authenticate;

app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', express.static(path.join(__dirname, '../../apiDocs/')));
app.use(express.static(path.join(__dirname, '../../client/dist/app')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, x-ac' +
      'cess-token');
  next();
});

sendSurchargeJob();


 // We got a new email! 
app.use('/api/v1', authenticateRoutes, routes);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../client/dist/app/index.html')));

export default(app);
