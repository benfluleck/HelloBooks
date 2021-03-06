#!/usr/bin/env node

import debug from 'debug'; // ('Server:server');
import http from 'http';
import db from '../models';

/**
 * Module dependencies.
 */
import app from '../app';

// let app = require('../app');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
//  server.listen(port);
db
  .sequelize
  .sync({})
  .then(() => {
    server.listen(port);
  });

server.on('error', onError);
server.on('listening', onListening);

/**
 * @description normalizes port
 *
 * @param {object} val
 * @returns {port|val} port or val
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 *
 *
 * @param {object} error
 * @returns {oject} error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    `Pipe ${port}` :
    `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
}
/**
 * @description Listener for the server
 * @returns {undefined} undefined
 *
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    `pipe ${addr}` :
    `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
