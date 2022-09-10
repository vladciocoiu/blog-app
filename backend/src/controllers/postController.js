const express = require('express');
const postModel = require('../models/postModel');
const mongoose = require('mongoose');

const app = express();


exports.getPosts = async(req, res) => {

    // get all posts from db
    const posts = await postModel.find({}).lean();

    // return in json format
    res.json(posts);
};


exports.createPost = async(req, res) => {
    // get title and text from request body
    const { title, text } = req.body;

    try {
        // create new post
        const newPost = new postModel({ title, text });
        
        // save post
        await newPost.save();

        // send the newly created post back to the client
        res.json({ newPost });

    } catch (err) {
        // send the error if any
        res.status(400).json(err);
    }
};

exports.editPost = async(req, res) => {
    // get title, text, and postId from request
    const { title, text } = req.body;
    const postId = req.params['postId'];
    console.log(postId);

    try {
        const post = await postModel.findById(postId);

        // if no post found, return 404
        if (!post) return res.status(404).json({ message: 'Error: Post not found.' });
        
        // update and save
        post.title = title;
        post.text = text;

        // return the updated post
        const updatedPost = await post.save();
        res.json(updatedPost);

    } catch (err) {
        // return error if any
        res.status(400).json(err); 
    }
}

exports.deletePost = async(req, res) => {
    // get postId from request
    const postId = req.params['postId'];

    try {
        await postModel.deleteOne({ _id: postId });
        
        // return 204: no content
        return res.status(204).json({});

    } catch (err) {
        res.status(404).json(err);
    }
}
