require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const secret = process.env['JWT_SECRET']

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
  algorithms: ['HS256']
};

// index.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(new JwtStrategy(options, function (jwt_payload, done) {

    console.log(jwt_payload);

    // We will assign the `sub` property on the JWT to the database ID of user
    User.findOne({ _id: jwt_payload.sub }, function (err, user) {

      if (err) {  //Error case 
        return done(err, false);
      }
      if (user) { // Success case
        return done(null, user);
      } else {  // Not found case
        return done(null, false);
      }

    });
  }));
}