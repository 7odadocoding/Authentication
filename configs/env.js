require('dotenv').config();

console.log(
   process.env.ENV == 'development'
      ? 'server is running in development'
      : 'server is running on production'
);

const env =
   process.env.ENV == 'development'
      ? {
           dbUri: process.env.DB_URI_DEV,
           port: 3000,
           sessionSecret: process.env.SESSION_SECRET_DEV,
           jwtSecret: process.env.JWT_SECRET_DEV,
        }
      : {
           dbUri: process.env.DB_URI,
           port: process.env.PORT,
           sessionSecret: process.env.SESSION_SECRET,
           jwtSecret: process.env.JWT_SECRET,
        };

module.exports = env;
