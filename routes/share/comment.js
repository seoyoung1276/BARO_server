const express = require('express')
const router = express.Router()

// 댓글 작성
router.post('/:postid')

// 댓글 불러오기
router.get('/')

// 댓글 수정
router.patch('/patch')

// 댓글 삭제
router.delete('/')

// 특정 포스트의 댓글을 불러오기
router.get('/:postno/c')

// 특정 유저의 댓글을 불러오기 (나의 댓글을 보기위해)

exports.moduel = router;