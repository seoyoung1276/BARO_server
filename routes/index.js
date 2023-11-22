const { loginFailed } = require('../controllers/auth')

const express = require('express');

const auth = require('./auth');
const user = require('./user');

const sharePost = require('./share/post');
const shareComment = require('./share/comment');

const learnPost = require('./learn/post');

const togetherPost = require('./together/post');

const router = express.Router();

router.get('/login-failed', loginFailed);

router.use('/auth', auth);
router.use('/user', user);
router.use('/share/post', sharePost);
router.use('/together/post',togetherPost);
router.use('/learn/post',learnPost);
router.use('/share/comment', shareComment);

module.exports = router;