const express = require('express')
const router = express.Router()
const { postComment, getComment, updateComment, deleteComment, getUserComments } = require('../../controllers/share/comment')

// 댓글 작성
router.post('/:postid', postComment)

// 댓글 불러오기
router.get('/:postid', getComment)

// 댓글 수정
router.patch('/:commentid', updateComment)

// 댓글 삭제
router.delete('/:commentid',deleteComment)

// 특정 유저의 댓글을 불러오기
router.get('/:userno', getUserComments)

// 특정 유저의 댓글을 불러오기 (나의 댓글을 보기위해)

module.exports = router;