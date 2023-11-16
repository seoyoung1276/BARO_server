const express = require('express')
const router = express.Router()
const { createPost, getAllSharePost, getOneSharePost, updateSharePost, deleteSharePost} = require('../controllers/share');

// 나누기 글쓰기
router.post('/post', createPost);

//나누기 글 전체 조회 (나누기 카테고리를 누르면 전부 나와야 한다. 최신글이 위에 어떻게 나오게 해야할까... 아 데이트로 정렬하면될듯!)
router.get('/post', getAllSharePost);

// 나누기 글 번호로 글 조회하기 (여기가 글 클릭시 나올것!) 
router.get('/post/:postno', getOneSharePost)

// 게시글 수정과 삭제... 일단 내 글인지 확인 해야함 controller에서 req.user 와 글의 user.no 비교하면 될듯
router.patch('/post/:postno', updateSharePost)

router.delete('/post/:postno', deleteSharePost)

//나누기 완료 해주는 라우터!! 완료하기 버튼을 누르면 해당 포스트에 저장된 user_no(fk)랑 req.user랑 비교하고 음....움.... 
router.post

module.exports = router;