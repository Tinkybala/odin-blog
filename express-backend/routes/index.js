var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');


router.get('/user', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json(req.user);
})

module.exports = router;
