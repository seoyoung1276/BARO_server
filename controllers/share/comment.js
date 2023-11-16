const ShareComment = require('../../models/ShareComment'); 

exports.postComment = async (req, res) => {
    try{
        const postId = req.params.postid;
        const { user_no, post_id, content } = req.body;
        const newComment = await ShareComment.create({
            user_no: user_no,
            post_id: postId,
            content: content
        });
        res.json(newComment);

    }catch (error){
        res.status(500).json({error:error})
    }
};