const express = require('express')
const router = express.Router()
const userController = require('../controllers/user');

// 유저 1명씩 조회 
router.get('/:userno', userController.getByUserNo);

// 

module.exports = router;