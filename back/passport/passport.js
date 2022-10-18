
const passport = require('passport')
const GoogleTokenStrategy = require('passport-google-token').Strategy

googleAuth = {
    'clientID'         : '949133872098-hdsshoo05f00tv63lqnaofon3aeo5l7v.apps.googleusercontent.com',
    'clientSecret'     : 'bnlK1Sjfiz99Hh8JLKHk2rPO',
    'callbackURL'      : '/auth/google/callback'
}

module.exports = function () {
    passport.use(new GoogleTokenStrategy({
      clientID: googleAuth.clientID,
      clientSecret: googleAuth.clientSecret
    }, function (accessToken, refreshToken, profile, done) {
      console.log("access", accessToken, "refresh", refreshToken)

      done({}, profile)
      console.log("end of func")
    }))
  }
  