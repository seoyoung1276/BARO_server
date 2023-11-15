const express = require('express')
const { isLoggedin } = require('../middlewares');
const router = express.Router()
const {createPost} = require('../controllers/share');

// 나누기 글쓰기
router.post('/post',createPost);

module.exports = router;