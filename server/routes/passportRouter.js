const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to a protected page or the home page.
    res.redirect('/preferences');
  });


// Google authentication route
router.get("'/google'", passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback route
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/preferences'); // or any other route you'd like to redirect the user to
  }
);



module.exports = router;
