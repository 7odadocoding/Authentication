const jwt = require('jsonwebtoken');
const env = require('../configs/env');

const isLoggedIn = (req, res, next) => {
   if (req.session && req.session.user) {
      const user = jwt.verify(req.session.user, env.jwtSecret);
      if (user) {
         return res.redirect('/profile');
      }
   }
   next();
};

module.exports = isLoggedIn;
