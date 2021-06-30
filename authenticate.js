const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // to create, sign and verify token

const config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); // serialize and deserialize is to process the data to be able to store them

exports.getToken = function(user){
    return jwt.sign(user, config.secretKey, {expiresIn: 36000})  // this means the token will be expired in the next 10 hours, if without this code, it will be never expired which is not recommended

};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // this is to specify how we want the the token to be sent, here is to the authheader as bearer
opts.secretOrKey = config.secretKey;  //this secret key will sign us a token

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload:, jwt_payload');
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) {
                    return done(err, false);  // if err, then err is err, and user is false
                } else if (user) {
                    return done (null, user); // if user, then err is null, and user is user
                } else {
                    return done (null, false); // if not err and not find user, then err is null, user is false
                }
            })
            })
            )

exports.verifyUser = passport.authenticate('jwt', {session: false})  // turn the session off since we only use jwt not session here


