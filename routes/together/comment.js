const express = require('express')
const router = express.Router()
const { postComment, getComment, updateComment, deleteComment, getUserComments, getOneComment } = require('../../controllers/together/comment')

// 댓글 작성
router.post('/:postid', postComment)

// 댓글 불러오기
router.get('/:postid', getComment)

// 댓글 수정
router.patch('/:commentid', updateComment)

// 댓글 삭제
router.delete('/:commentid',deleteComment)

// 특정 유저의 댓글을 불러오기
router.get('/user/:userno', getUserComments)

module.exports = router;