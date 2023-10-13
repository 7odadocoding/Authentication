const jwt = require('jsonwebtoken');
const env = require('../configs/env');

const auth = (req, res, next) => {
   if (req.session && req.session.user) {
      const user = jwt.verify(req.session.user, env.jwtSecret);
      if (user) {
         req.userId = user.userId;
         return next();
      }
   }
   res.status(403).redirect('/login?error=please login first to access your profile');
};

module.exports = auth;
