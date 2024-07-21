var express = require('express');
var router = express.Router();
const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const Comment = require('../models/comment');
const passport = require('passport');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../models/user');


//middleware to get user from token
const getUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const token_number = token.split(" ")[1];
        await jwt.verify(token_number, process.env.SECRET, async (err, user) => {
            if(err) {
                console.log(err);
                req.user = false;
                next();
                return;
            }
            user = await User.findById(user.sub)
                .then(result => result);
            req.user = user;
        })
    }
    next();
}


/*GET routes*/

//all posts
router.get('/', getUser, asyncHandler(async (req, res, next) => {
    let posts
    if(req.user && req.user.authorisedSites.includes("cms") && req.headers['x-site-type'] == "cms"){
        posts = await Post.find().sort({date : 1});
    } else {
        posts = await Post.find({status: "publish"}).sort({date : 1});
    }
    res.json(posts);
}))

//continent 
router.get('/:continent', getUser, asyncHandler(async (req, res, next) => {
    console.log(req.user);
    let posts;
    if(req.user && req.user.authorisedSites.includes("cms") && req.headers['x-site-type'] == "cms"){
        //cms website
        posts = await Post.find({continent: req.params.continent}).sort({date : 1});
    } else {
        //public website
        posts = await Post.find({continent: req.params.continent, status: "publish"}).sort({date : 1});
    }
    res.json(posts);
}))

//specific post
router.get('/:continent/:id', asyncHandler(async (req, res, next) => {
    const post = await Post.findOne({_id: req.params.id});
    res.json(post);
}))

//returns array of comments
router.get('/:continent/:id/comments', asyncHandler(async (req, res, next) => {
    const comments = await Comment.find({post: req.params.id});
    res.json(comments);
}))

/*POST routes*/

//create post
router.post('/', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user.first_name + " " +  req.user.last_name,
        author_id: req.user._id,
        date: new Date(),
        status: req.body.publish ? "publish" : "draft",
        continent: req.body.continent,
    });

    await post.save();
    res.json(post);
}))

//create comment
router.post('/:continent/:id/comments', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {
    const comment = new Comment({
        author_id: req.user._id,
        author: req.user.first_name + " " + req.user.last_name,
        date: new Date(),
        content: req.body.content,
        post: req.params.id
    })

    await comment.save();
    res.json(comment);
    
}))

/*PUT routes*/

//update post
router.put('/:continent/:id', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const update = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
        status: req.body.publish ? "publish" : "draft",
        continent: req.body.continent,
    };

    const updated = await Post.findByIdAndUpdate(id, update, {new: true});
    if(!updated) {
        res.status(404).json({ message: "Post not found" });
    }

    res.json(updated);
}))

//update comment
router.put('/:continent/:id/comments', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const update = {
        date: new Date(),
        content: req.body.content,
    }

    const updated = await Comment.findByIdAndUpdate(id, update, {new: true});

    if (!updated) {
        res.status(404).json({ message: "Comment not found" });
    }

    res.json(updated);
}))

/*DELETE routes*/

//delete post
router.delete('/:continent/:id', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const deleted = await Post.findByIdAndDelete(id, {new: true});
    res.json(deleted);
}))

//delete comment
router.delete('/:continent/:id/comments/:commentID', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {
    const commentID = req.params.commentID;
    const comment = await Comment.findById(commentID);
    if(comment.author_id.equals(req.user._id) || req.user.authorisedSites.includes("cms")) {
        const deleted = await Comment.findByIdAndDelete(commentID, {new: true});
        res.json(deleted);
    }
    res.status(401).json({message: "Unauthorised to delete comment"});
}))

module.exports = router;