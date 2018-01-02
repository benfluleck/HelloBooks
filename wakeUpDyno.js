import * as log from 'loglevel';
import http from 'http';

const options = {
  host: 'staging-hellobooks.herokuapp.com',
  port: 80,
  path: '/WAKEUP_DYNO'
};
log.debug('======WAKEUP DYNO START');
http.get(options, (res) => {
  res.on('data', (chunk) => {
    try {
      // optional logging... disable after it's working
      log.debug(`======WAKUP DYNO: HEROKU RESPONSE: ${chunk}`);
    } catch (err) {
      log.debug(err.message);
    }
  });
}).on('error', (err) => {
  log.debug(`Error: ${err.message}`);
});
