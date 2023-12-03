const express = require('express')
const router = express.Router()
const { createPost, getAllPost, getOnePost, getUserPost, updatePost, deletePost, isFinishPost} = require('../../controllers/share/post');

// 나누기 글쓰기
router.post('/', createPost);

//나누기 글 전체 조회 
router.get('/', getAllPost);

// 나누기 글 번호로 글 조회하기 
router.get('/:postno', getOnePost)

// 나누기 글 유저로 조회하기
router.get('/user/:userno', getUserPost)

// 게시글 수정
router.patch('/:postno', updatePost)

// 게시글 삭제
router.delete('/:postno', deletePost)

//나누기 완료
router.patch('/isfinish/:postno', isFinishPost)

module.exports = router;