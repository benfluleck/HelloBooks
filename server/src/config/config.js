import dotenv from 'dotenv';

dotenv.config();


export default {

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
    dialect: process.env.DBDIALECT
  },

  production: {
    dialect: process.env.DBDIALECT,
    use_env_variable: process.env.DATABASE_URL

  }
};
