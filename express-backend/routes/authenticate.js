var express = require('express');
var router = express.Router();
const passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: "Authenticated successfully!",
        userID: req.user._id,
        first_name: req.user.first_name,
    });
})

module.exports = router;