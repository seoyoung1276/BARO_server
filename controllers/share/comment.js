const ShareComment = require('../../models/ShareComment');

exports.postComment = async (req, res) => {
    try {
        const postId = req.params.postid;
        const { user_no, content, responseTo } = req.body;

        let response;
        if (responseTo === undefined) {
            response = await ShareComment.create({
                user_no: user_no,
                post_id: postId,
                content: content
            });
        } else {
            response = await ShareComment.create({
                user_no: user_no,
                post_id: postId, // postId 변수 이름을 'postId'로 변경하여 일관성 있게 수정
                content: content,
                responseTo: responseTo 
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
        const comments = await ShareComment.find({ post_id: postId }); // 특정 포스트 ID에 대한 댓글 가져오기
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.getUserComments = async (req, res) => {
    try {
        const userNo = req.params.userNo; // 특정 사용자의 userNo를 파라미터에서 받습니다.
        const userComments = await ShareComment.find({ user_no: userNo });
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