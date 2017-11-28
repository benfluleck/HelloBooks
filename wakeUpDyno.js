import http from 'http';

const options = {
  host: 'staging-hellobooks.herokuapp.com',
  port: 80,
  path: '/WAKEUP_DYNO'
};
console.log('======WAKEUP DYNO START');
http.get(options, (res) => {
  res.on('data', (chunk) => {
    try {
      // optional logging... disable after it's working
      console.log(`======WAKUP DYNO: HEROKU RESPONSE: ${chunk}`);
    } catch (err) {
      console.log(err.message);
    }
  });
}).on('error', (err) => {
  console.log(`Error: ${err.message}`);
});
