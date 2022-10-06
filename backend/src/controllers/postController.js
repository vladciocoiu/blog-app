const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');
const userModel = require('../models/userModel');

const path = require('path');
const multer = require('multer');
const { createVerify } = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname))
    } 
});

exports.upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const ACCEPTED_FILE_TYPES = ['image/jpg', 'image/png', 'image/jpeg'];
        if(ACCEPTED_FILE_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            return cb('File type not allowed.', false);
        }
    }    
}).single('image');


exports.getPosts = async(req, res) => {

    // get all posts from db
    const posts = await postModel.find({}).lean();

    // replace user id's with their names
    for(let post of posts) {
        const authorId = post.author;
        const author = await userModel.findById(authorId);
        post.author = author.name;

        post.imagePath = '/public/uploads/' + post.imageName;
    }

    // return in json format
    res.json(posts);
};

exports.getSinglePost = async(req, res) => {
    const { postId } = req.params;

    const post = await postModel.findById(postId).lean();

    if (!post) return res.status(404).json({ error: 'Post not found.' });

    // replace user id with their name
    const authorId = post.author;
    const author = await userModel.findById(authorId);
    post.author = author.name;

    post.imagePath = '/public/uploads/' + post.imageName;

    res.json(post);
}


exports.createPost = async(req, res) => {
    // get title and text from request body
    const { title, text } = req.body;

    // get user
    const { userId } = req.user;

    try {
        // create new post
        const newPost = new postModel({ title, text, author: userId, imageName: req.file.filename });
        
        // save post
        await newPost.save();

        // send the newly created post back to the client
        res.json(newPost);

    } catch (err) {
        // send the error if any
        res.status(400).json({ error: err });
    }
};

exports.editPost = async(req, res) => {
    // get title, text, and postId from request
    const { title, text, isPublished } = req.body;
    const { postId } = req.params;

    try {
        const post = await postModel.findById(postId);

        // if no post found, return 404
        if (!post) return res.status(404).json({ error: 'Post not found.' });
        
        // update 
        post.title = title;
        post.text = text;
        post.isPublished = isPublished;

        // return the updated post
        const updatedPost = await post.save();
        res.json(updatedPost);

    } catch (err) {
        // return error if any
        res.status(400).json({ error: err }); 
    }
};

exports.deletePost = async(req, res) => {
    // get postId from request
    const { postId } = req.params;

    try {
        // delete all comments of that post
        await commentModel.deleteMany({ postId });

        // delete post
        await postModel.deleteOne({ _id: postId });
        
        
        // return 204: no content
        return res.status(204).json({});

    } catch (err) {
        res.status(400).json({ error: err });
    }
};
