const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const { v4: uuidV4 } = require('uuid');
const cors = require('cors');
const env = require('./configs/env');
const mainRouter = require('./routes/mainRouter');
const notFound = require('./middlewares/notFound');
const MongoDb = require('./configs/mongodb');
const authSystem = express();
const multer = require('multer');
MongoDb.setUri(env.dbUri)
   .getDb()
   .then((db) => console.log(db.connection.name));

authSystem.use(
   expressSession({
      genid: uuidV4,
      secret: env.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
   })
);

authSystem.set('view engine', 'ejs');
authSystem.use(multer().any());
authSystem.use(bodyParser.urlencoded({ extended: true }));
authSystem.use(express.static(__dirname + '/public'));
authSystem.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

authSystem.use('/', mainRouter);
authSystem.use('*', notFound);

authSystem.listen(env.port, () =>
   console.log(`authSystem listening on port ${env.port}!`)
);
