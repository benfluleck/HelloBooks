import configDev from './configStore.dev';
import configProd from './configStore.prod';

if (process.env.NODE_ENV === 'production') {
  module.exports = configProd;
} else {
  module.exports = configDev;
}
