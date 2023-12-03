const express = require('express')
const router = express.Router()
const { createPost, getAllPost, getOnePost, getUserPost, updatePost, deletePost, addAttend, deleteAttend, getAttend, isAttend} = require('../../controllers/together/post');


router.post('/', createPost);
 
router.get('/', getAllPost);

router.get('/:postno', getOnePost)

router.get('/user/:userno', getUserPost)

router.patch('/:postno', updatePost)

router.delete('/:postno', deletePost)

// 참가하기
router.post('/:postno/attend', addAttend);

// 참가취소
router.delete('/:postno/attend/:userno', deleteAttend);

// 참가 목록 조회
router.get('/:postno/attend', getAttend);

// 참여 했는지 여부
router.get('/:postno/isattend/:userno', isAttend)

module.exports = router;