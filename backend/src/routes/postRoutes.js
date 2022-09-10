const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.put('/:postId', postController.editPost)
router.delete('/:postId', postController.deletePost)

module.exports = router;