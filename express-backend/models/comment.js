const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const luxon = require('luxon');

const CommentSchema = new Schema({
    author_id: {type: Schema.Types.ObjectId, ref: "User", required: true},
    author: {type: String, required: true},
    date: {type: Date, required: true},
    content: {type: String, required: true, minLength: 1, maxLength: 300},
    post: {type: Schema.Types.ObjectId, ref: "Post", required: true},
})

CommentSchema.virtual("date_formatted").get(function() {
    //use luxon to format date
    luxonDate = DateTime.fromJSDate(this.date);
    return luxonDate.toFormat('yyyy-MM-dd');
})

module.exports = mongoose.model("Comment", CommentSchema);