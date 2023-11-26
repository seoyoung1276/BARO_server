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
                responseTo: responseTo // 'responseTo'의 대소문자를 올바르게 수정
            });
        }
        res.json(response);
    } catch (error) {
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

// exports.patchComment = async (req, res) => {
//     try{

//     }
// }
