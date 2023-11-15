const express = require('express')
const { isLoggedin } = require('../middlewares');
const router = express.Router()
const {createPost} = require('../controllers/share');

router.post('/post',createPost);

module.exports = router;