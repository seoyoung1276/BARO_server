const ShareComment = require('../../models/ShareComment'); 

exports.postComment = async (req, res) => {
    try{
        const postId = req.params.postid;
        const { user_no, post_id, content, responseTo } = req.body;

        let response;
        if(responseTo === undefined) {
            response = await ShareComment.create({
                user_no: user_no,
                post_id: post_id,
                content: content
            });
            res.json(response);
        }else{
            const response = await ShareComment.create({
                user_no: user_no,
                post_id: postId,
                content: content,
                responseto: responseTo 
            })
            res.json(response);
        }
    }catch (error){
        res.status(500).json({error:error})
    }
};

// exports.getComment = async (req, res) =>{
//     try{
//         const postId = req.params.postid;
//     }catch (error){
//         res.status(500).json({ error: error })
//     }
// }

// 댓글 수정