const express = require('express');

const postRouter = require('./postRoutes');
const commentRouter = require('./commentRoutes');

const router = express.Router({ mergeParams: true });

router.use('/posts', postRouter);
router.use('/posts/:postId/comments', commentRouter);

module.exports = router;