import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';

// import sequelize from '../models';
import app from '../app';
// import mocha from 'mocha';
import db from '../models';
const User = db.User;
const Books = db.Books;
// const server = require('../routes/index');
