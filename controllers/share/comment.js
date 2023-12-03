const ShareComment = require('../../models/ShareComment');

exports.postComment = async (req, res) => {
    try {
        const postId = req.params.postid;
        const { user_no, content, responseTo } = req.body;

        let response;
        if (responseTo != undefined) {
            response = await ShareComment.create({
                user_no: user_no,
                post_id: postId, 
                content: content,
                responseTo: responseTo 
            });
        } else {
            response = await ShareComment.create({
                user_no: user_no,
                post_id: postId, 
                content: content,
            });
        }
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

exports.getComment = async (req, res) => {
    try {
        const postId = req.params.postid;
        const comments = await ShareComment.findAll(
            { post_id: postId }
            ); // 특정 포스트 ID에 대한 댓글 가져오기
        res.json(comments);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
};

exports.getOneComment = async (req, res) => {
    try{
        const commentId = req.params.commentid;
        const comments = await ShareComment.findOne(
            { comment_id: commentId}
        );
        res.json(comments);
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: error}) ;

    }
}


exports.getUserComments = async (req, res) => {
    try {
        const userNo = req.params.userNo; 
        const userComments = await ShareComment.findAll({ user_no: userNo });
        res.json(userComments);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


exports.updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentid;
        const { user_no, content } = req.body;

        const comment = await ShareComment.findById(commentId);
        if (comment.user_no !== user_no) {
            return res.status(403).json({ error: '해당 댓글의 작성자가 아닙니다.' });
        }

        const updatedComment = await ShareComment.findByIdAndUpdate(commentId, { content: content }, { new: true });
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentid;
        const { user_no } = req.body;

        const comment = await ShareComment.findById(commentId);
        if (comment.user_no !== user_no) {
            return res.status(403).json({ error: '해당 댓글의 작성자가 아닙니다.' });
        }

        await ShareComment.findByIdAndDelete(commentId);
        res.json({ message: '댓글이 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};