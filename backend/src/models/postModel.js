const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);