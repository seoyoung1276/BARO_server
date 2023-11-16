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
    const allSharePost = await SharePost.findAll();
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

exports.updateSharePost = async (req, res) =>{
  try{
    const postNo = req.params.postno;
    const { title, content } = req.body;
    const currentUser = req.user;

    const foundpost = await SharePost.findOne({
        where: {
          post_no: postNo,
          user_no: currentUser.user_no
        }
    });
    if(!foundpost){
      return res.status(404).json({ message : "게시물을 찾을 수 없습니다." })
    }
    const update = await SharePost.update(
      {title, content},
      {
        where: {
          post_no: postNo,
          user_no: currentUser.user_no
        }
      }
    );
    res.json(update);

  } catch (error){
    console.log(error);
    res.status(500).json({ error : "서버 오류입니다."})
  }
}

exports.deleteSharePost = async (req, res) =>{
  try{
    const postNo = req.params.postno;
    const currentUser = req.user;

    const foundpost = await SharePost.findOne({
      where: {
        post_no: postNo,
        user_no: currentUser.user_no
      }
    })
    if(!foundpost){
      res.status(404).json( {message : "해당하는 게시글이 존재하지 않습니다."});
    }
    const deletePost = await SharePost.destory({
      where: {
        post_no: postNo
      }
    }).then(() =>{
      res.redirect("/share/post")
    })

  }catch(error){
    console.log(error);
    res.status(500).json({ error : "서버 오류"})
  }
}