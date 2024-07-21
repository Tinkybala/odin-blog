const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('../models/comment');

const PostSchema = new Schema({
    title: {type: String, required: true, minLength: 1, maxLength: 25, unique: true},
    content: {type: String, required: true, minLength: 1, maxLength: 3000},
    author_id: {type: Schema.Types.ObjectId, ref: "User", required: true},
    author: {type: String, required: true, minLength: 1, maxLength: 25},
    date: {type: Date, required: true},
    status: {type: String, enum: ["publish", "draft"], required: true, default: "draft"},
    continent: {type: String, enum: ["North America", "South America", "Asia", "Europe", "Australia", "Africa"]},
})

module.exports = mongoose.model("Post", PostSchema);