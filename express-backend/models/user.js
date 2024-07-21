const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {type: String, required: true, minLength: 1, maxLength: 25},
    last_name: {type: String, required: true, minLength: 1, maxLength: 25},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 1},
    authorisedSites : {type: [String], enum: ['public', 'cms'], required: true, default: ['public']}
})

module.exports = mongoose.model("User", UserSchema);