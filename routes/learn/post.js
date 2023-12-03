const express = require('express')
const router = express.Router()
const { createPost, getAllPost, getOnePost, getUserPost, updatePost, deletePost, isFinishPost} = require('../../controllers/learn/post');


router.post('/', createPost);
 
router.get('/', getAllPost);

router.get('/:postno', getOnePost)

router.get('/user/:userno', getUserPost)

router.patch('/:postno', updatePost)

router.delete('/:postno', deletePost)

router.patch('/isfinish/:postno', isFinishPost)

module.exports = router;