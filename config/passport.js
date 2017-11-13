var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user');
var KakaoStrategy = require('passport-kakao').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('kakao-login', new KakaoStrategy({
      clientID: '',
      clientSecret: '',
      callbackURL: 'http://localhost:3000/oauth'
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  ));
};
