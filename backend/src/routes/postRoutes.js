const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

const verifyToken = require('../middleware/verifyToken');
const verifyUser = require('../middleware/verifyUser');

router.get('/', postController.getPosts);
router.post('/', verifyToken, postController.createPost);

router.get('/:postId', postController.getSinglePost);

router.put('/:postId', verifyToken, verifyUser, postController.editPost);
router.delete('/:postId', verifyToken, verifyUser, postController.deletePost);

module.exports = router;