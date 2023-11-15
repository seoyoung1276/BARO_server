const SharePost = require('../models/share_posts'); // 모델 파일 경로에 맞게 변경

// 나누기 글 쓰기
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const currentUser = req.user; 

    const newPost = await SharePost.create({
      user_no: currentUser.user_no,
      title,
      content,
    });
    res.json(newPost);
  } catch(error){
    console.log(error);
    res.status(500).json({ error : error });
  }
};


// 나누기의 모든 글 불러오기
exports.getAllSharePost = async (req, res) => {
    try {
    const allSharePost = await SharePost.findAll({
        order: [['date', 'DESC']] // 최신순으로 정렬..
    });
    res.json(allSharePost)
    }catch (error){
        console.log(error);
        res.status(500).json({ error : error})
    }

}

// 나누기의 한가지 글 불러오기
exports.getOneSharePost = async (req, res) =>{
    try{
        const postno = req.params.postno
        const oneSharePost = await SharePost.findOne({
            where: {post_no: postno}
        });
        res.json(oneSharePost)

    }catch (error){
        console.log(error);
        res.status(500).json({ error: error})
    }
}
