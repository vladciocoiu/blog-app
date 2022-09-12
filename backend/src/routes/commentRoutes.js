const express = require('express');
const router = express.Router({ mergeParams: true });

const commentController = require('../controllers/commentController');

const verifyToken = require('../middleware/verifyToken');

router.get('/', commentController.getComments);
router.post('/', verifyToken, commentController.createComment);

router.put('/:commentId', verifyToken, commentController.editComment);
router.delete('/:commentId', verifyToken, commentController.deleteComment);

module.exports = router;