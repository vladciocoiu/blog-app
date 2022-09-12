const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

const verifyToken = require('../middleware/verifyToken');

router.get('/', postController.getPosts);
router.post('/', verifyToken, postController.createPost);

router.get('/:postId', postController.getSinglePost);
router.put('/:postId', verifyToken, postController.editPost);
router.delete('/:postId', verifyToken, postController.deletePost);

module.exports = router;