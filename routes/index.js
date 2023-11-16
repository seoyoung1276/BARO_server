const express = require('express');

const auth = require('./auth');
const user = require('./user');

const sharePost = require('./share/post');
const shareComment = require('./share/comment');

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/share/post', sharePost);
//router.use('/share/post/comment', shareComment);

module.exports = router;