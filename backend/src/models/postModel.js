import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);