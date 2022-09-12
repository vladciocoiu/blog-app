const express = require('express');
const router = express.Router({ mergeParams: true });

const commentController = require('../controllers/commentController');

const verifyToken = require('../middleware/verifyToken');
const verifyUser = require('../middleware/verifyUser');


router.get('/', commentController.getComments);
router.post('/', verifyToken, commentController.createComment);

router.put('/:commentId', verifyToken, verifyUser, commentController.editComment);
router.delete('/:commentId', verifyToken, verifyUser, commentController.deleteComment);

module.exports = router;