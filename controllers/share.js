const { share_posts } = require('../models'); // 모델 가져오기

exports.createPost = async (req, res) =>{
    try {
        const {user_no, title, content} = req.body;
        const currentUser = req.user; 

        const newPost = await share_posts.create({
            user_no: currentUser.user_no,
            title,
            content,
        });
        
        res.json(newPost)
    } catch(error){
        console.log(error);
        res.status(500).json({ error : error})
    }
}
