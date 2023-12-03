const { loginFailed } = require('../controllers/auth')

const express = require('express');

const auth = require('./auth');
const user = require('./user');

const sharePost = require('./share/post');
const shareComment = require('./share/comment');

const learnPost = require('./learn/post');
const learnComment = require('./learn/comment')

const togetherPost = require('./together/post');
const togetherComment = require('./together/comment')

const router = express.Router();

router.get('/login-failed', loginFailed);

router.use('/auth', auth);
router.use('/user', user);
router.use('/share/post', sharePost);
router.use('/together/post',togetherPost);
router.use('/learn/post',learnPost);
router.use('/share/comment', shareComment);
router.use('/learn/comment', learnComment);
router.use('/together/comment',togetherComment);

module.exports = router;