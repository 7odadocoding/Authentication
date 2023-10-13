const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const env = require('../configs/env');

class AuthService {
   invalid_credentials = { message: 'invalid credentials', error: 'invalid_credentials' };
   /**
    *
    * @param {User} userModel
    * @param {jwt} jwt
    * @param {bcrypt} bcrypt
    */

   constructor(userModel, jwt, bcrypt) {
      this.users = userModel;
      this.jwt = jwt;
      this.bcrypt = bcrypt;
   }

   async getProfile(req, res, next) {
      try {
         const { name, email } = await this.users.findById(req.userId);
         res.status(200).render('profile', { name, email });
      } catch (error) {
         next(error);
      }
   }

   async signup(req, res, next) {
      try {
         const { name, email, password } = req.body;
         const isEmailExist = (await this.users.find({ email })).length;
         if (isEmailExist)
            return res
               .status(403)
               .send(
                  'Your email is already used try to <a href="/login">login</a> with,or try another email'
               );
         const salt = this.bcrypt.genSaltSync(10);
         const hashedPassword = this.bcrypt.hashSync(password + salt, salt);
         const newUser = new this.users({
            name,
            password: hashedPassword,
            email,
            salt,
         });
         const user = await newUser.save();
         const token = this.jwt.sign({ userId: user._id }, env.jwtSecret);
         req.session.user = token;
         res.redirect(`/login?message= user created with id ${user._id}`);
      } catch (error) {
         next(error);
      }
   }

   async login(req, res, next) {
      try {
         const { email, password } = req.body;
         const user = await this.users.findOne({ email });
         if (!user) return res.status(403).json(this.invalid_credentials);
         const isPasswordMatched = this.bcrypt.compareSync(
            password + user.salt,
            user.password
         );
         if (!isPasswordMatched) return res.status(403).json(this.invalid_credentials);
         req.session.user = this.jwt.sign({ userId: user._id }, env.jwtSecret);
         res.status(200).redirect('/profile');
      } catch (error) {
         next(error);
      }
   }

   async logout(req, res, next) {
      try {
         req.session.destroy((err) => {
            if (err) throw err;
            res.status(200).redirect('/login?message=logged out successfully.');
         });
      } catch (error) {
         next(error);
      }
   }
}
const authServices = new AuthService(User, jwt, bcrypt);
module.exports = authServices;
