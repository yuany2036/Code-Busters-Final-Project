const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

const User = require('./models/userModel');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:4000/auth/facebook/callback", // Update this with your callback URL
    profileFields: ['id', 'displayName', 'email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      const user = await User.findOne({ facebookId: profile.id });

      if (user) {
        // If the user is found, return the user
        return cb(null, user);
      } else {
        // If the user is not found, create a new user
        const newUser = new User({
          facebookId: profile.id,
          username: profile.displayName,
          firstName: profile.name.givenName || 'Unknown',
          lastName: profile.name.familyName || 'Unknown',
          email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `unknown_${profile.id}@example.com`,
          password: 'default_facebook_password',
          // Add any other relevant information from the profile object
        });

        await newUser.save();
        return cb(null, newUser);
      }
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
