const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');


exports.getPosts = async(req, res) => {

    // get all posts from db
    const posts = await postModel.find({}).lean();

    // return in json format
    res.json(posts);
};

exports.getSinglePost = async(req, res) => {
    const { postId } = req.params;

    const post = await postModel.findById(postId).lean();

    if (!post) return res.status(404).json({ error: 'Post not found.' });

    res.json(post);
}


exports.createPost = async(req, res) => {
    // get title and text from request body
    const { title, text } = req.body;

    // get user
    const { userId } = req.user;

    try {
        // create new post
        const newPost = new postModel({ title, text, author: userId });
        
        // save post
        await newPost.save();

        // send the newly created post back to the client
        res.json(newPost);

    } catch (err) {
        // send the error if any
        res.status(400).json(err);
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
        res.status(400).json(err); 
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
        res.status(404).json(err);
    }
};
