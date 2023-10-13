const { Router } = require('express');
const authServices = require('../services/auth.service');
const auth = require('../middlewares/authentication');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = Router();

// views

router.get('/login', isLoggedIn, (req, res) => {
   res.render('login', {
      successMessage: req.query.message || null,
      errorMessage: req.query.error || null,
   });
});
router.get('/signup', isLoggedIn, (req, res) => {
   res.render('signup');
});

//  auth

router.post('/login', authServices.login.bind(authServices));
router.post('/signup', authServices.signup.bind(authServices));
router.post('/logout', authServices.logout.bind(authServices));

// authentication required pages
router.get('/profile', auth, authServices.getProfile.bind(authServices));

module.exports = router;
