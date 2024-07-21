require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');



var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var authRouter = require('./routes/authenticate');

var app = express();
app.options('*', cors());
app.use(cors());

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET // Replace with your own secret or get from environment variables
}, async (jwtPayload, done) => {
  try {
      // Check if the user exists in the database (Even if you delete a user form the DB, the token will still be valid)
      const user = await User.findById(jwtPayload.sub);

      if (!user) {
          return done(null, false);
      }

      // If user exists, return the user object
      return done(null, user);
  } catch (error) {
      return done(error, false);
  }
}));



//connect to mongoDB
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_DB;
connect().catch(e => {
  console.error("Error connecting to MongoDB:", e.message);
})
async function connect() {  
  await mongoose.connect(mongoDB);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/login', loginRouter); 
app.use('/signup', signupRouter);
app.use('/authenticate', authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //log error stack in console
  console.error(err.stack);

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: res.locals.message,
    error: res.locals.error
  });
});



module.exports = app;
