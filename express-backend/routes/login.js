var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
  

router.post('/', async(req, res) => {
    const {email, password, website} = req.body;
    console.log(email);
    const user = await User.findOne({email: email});
    //check wheter user is signed up 
    if(!user) {
      return res.status(401).json({message: "Email or password is incorrect"});
    }
    //check authorisation
    if(!user.authorisedSites.includes(website)) {
      return res.status(401).json({message: "You do not have access permission"});
    }
  
    //check whether password is correct
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      return res.status(401).json({message: "Email or password is incorrect"});
    }
  
    //create nad return JWT
    const token = jwt.sign({sub: user._id}, process.env.SECRET, {expiresIn: '1h'});
  
    res.json({userID: user._id, token: token, first_name: user.first_name});
})

module.exports = router;