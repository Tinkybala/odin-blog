var express = require('express');
var router = express.Router();  
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.post('/', [
    body("email")
    .trim()
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (value) => {
        const exist = await User.findOne({email: value});
        if(exist !== null) {
            console.log("User exists");
            return Promise.reject();
        }
    })
    .withMessage("Email already in use by another user"),

    body("password")
        .isLength({ min: 7 })
        .withMessage("Password must be at least 7 characters long")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,}$/)
        .withMessage("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character")
        .custom((password, {req}) => {
            const match = password === req.body.password2;  
            return match;
        })
        .withMessage("Passwords do not match"),


    body("first_name")
        .trim(),

    body("last_name")
        .trim(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});    
        } else {
            await bcrypt.hash(req.body.password, 10, async (e, hashedPassword) => {
                //create User document based on form parameters
                const user = new User({
                    email: req.body.email,
                    password: hashedPassword,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name
                });

                //add user to database
                try{
                    await user.save();
                    res.status(201).json({message: "User added successfully", user: user});
                } catch(error) {
                    if(error.name === 'ValidationError') {
                        res.status(400)
                        throw new Error(`Validaiton Error : ${error.message}`);
                    }
                }
            })
        }
    })

])

module.exports = router;