import dotenv from 'dotenv';

dotenv.config();


module.exports = {

  development: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    host: process.env.DBADDRESS,
    dialect: process.env.DBDIALECT
  },
  test: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.TESTDB,
    host: process.env.DBADDRESS,
    dialect: process.env.DBDIALECT,
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DBDIALECT
  }
};
