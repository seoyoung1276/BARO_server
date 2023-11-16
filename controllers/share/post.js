const SharePost = require('../../models/SharePost'); 

// 나누기 글 쓰기
exports.createPost = async (req, res) => {
  try {
    const { user_no, title, content } = req.body;
      const newPost = await SharePost.create({
        user_no: user_no,
        title: title,
        content: content,
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
    order: [['date', 'DESC']]
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

// 유저 글 불러오기
exports.getUserPost = async (req, res) =>{
  try{
    const userno = req.params.userno
    const getUserSharePost = await SharePost.findOne({
      where: {user_no: userno}
    });
    res.json(getUserSharePost)
  }catch (error) {
    console.log(error);
    res.status(500).json({ error: error})
  }
}

// 수정
exports.updateSharePost = async (req, res) =>{
  try{
    const postNo = req.params.postno;
    const { title, content } = req.body;

    const update = await SharePost.update(
      {title, content},
      {
        where: {
          post_no: postNo,
        }
      }
    );
    res.json(update);

  } catch (error){
    console.log(error);
    res.status(500).json({ error : "서버 오류입니다."})
  }
}

// 삭제
exports.deleteSharePost = async (req, res) =>{
  try{
    const postNo = req.params.postno;

    const deletePost = await SharePost.destory({
      where: {
        post_no: postNo
      }
    }).then(() =>{
      res.json(deletePost);
    })

  }catch(error){
    console.log(error);
    res.status(500).json({ error : "서버 오류"})
  }
}