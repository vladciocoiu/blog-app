const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');
const userModel = require('../models/userModel');


// middleware function that veirfies whether the current user has privileges to edit / delete a comment / post
// a user has these privileges if they are the author or if they are an admin
module.exports = async (req, res, next) => {
    const { userId } = req.user;
    const user = await userModel.findById(userId);

    // user doesn't exist in DB
    if (!user) return res.status(401).json({ error: 'User does not exist. '});
    console.log(user);

    // user is admin => they have privileges
    if(user.isAdmin) return next();

    // user is not admin, so we have to check if they are the author of the targeted resource
    const { postId, commentId } = req.params;

    // get the correct resource based on existent params
    if(commentId) resource = await commentModel.findById(commentId);
    else resource = await postModel.findById(postId);

    // resource doesn't exist in DB => 404
    if (!resource) return res.status(404).json({ error: 'Resource does not exist.' });

    // user is not the author => forbidden
    if(resource.author != userId) return res.status(403).json({ error: 'You are not the author of the resource.' });

    // everything is fine, go to next
    next();
}