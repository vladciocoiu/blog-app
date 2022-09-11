const commentModel = require('../models/commentModel');


// get all comments for a single post
exports.getComments = async(req, res) => {
    const { postId } = req.params;

    try {
        // get comments from db based on postId
        const comments = await commentModel.find({ postId }).lean();

        // return them in json
        return res.json(comments);

    } catch(err) {
        res.status(400).json(err);
    }
};

exports.createComment = async(req, res) => {
    // get all needed info from request
    const { postId } = req.params;
    const { authorName, text } = req.body;

    try {
        console.log(req.params);
        // create comment
        const newComment = new commentModel({ authorName, text, postId });

        // save comment in db
        await newComment.save();

        // return as json
        return res.json(newComment);

    } catch (err) {
        return res.status(400).json(err);
    }
}

exports.editComment = async(req, res) => {
    // get comment id
    const { commentId } = req.params;

    // get new text
    const { text } = req.body;

    try {
        // get comment from db
        const comment = await commentModel.findById(commentId);

        // return 404 if no comment found
        if(!comment) return res.status(404).json({ error: 'Comment not found.' });

        // update text
        comment.text = text;
        
        // save and return the new comment
        const updatedComment = await comment.save();
        return res.json(updatedComment);

    } catch (err) {
        res.status(400).json(err);
    }
}

exports.deleteComment = async(req, res) => {
    const { commentId } = req.params;

    try {
        // delete comment
        await commentModel.deleteOne({ _id: commentId });
        
        // return 204: no content
        return res.status(204).json({});

    } catch(err) {
        return res.status(404).json(err);
    }
}

