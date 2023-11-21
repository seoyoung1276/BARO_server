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
exports.getAllPost = async (req, res) => {
    try {
    const allPost = await SharePost.findAll({
    order: [['date', 'DESC']]
  });
    res.json(allPost)
    }catch (error){
        console.log(error);
        res.status(500).json({ error : error})
    }

}

// 나누기의 한가지 글 불러오기
exports.getOnePost = async (req, res) =>{
    try{
        const postno = req.params.postno
        const onePost = await SharePost.findOne({
            where: {id: postno}
        });
        res.json(onePost)

    }catch (error){
        console.log(error);
        res.status(500).json({ error: error})
    }
}

// 유저 글 불러오기
exports.getUserPost = async (req, res) =>{
  try{
    const userno = req.params.userno
    const getUserPost = await SharePost.findAll({
      where: {user_no: userno}
    });
    res.json(getUserPost)
  }catch (error) {
    console.log(error);
    res.status(500).json({ error: error})
  }
}

// 수정
exports.updatePost = async (req, res) =>{
  try{
    const postNo = req.params.postno;
    const { title, content } = req.body;

    const update = await SharePost.update(
      {title, content},
      {
        where: {
          id: postNo,
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
exports.deletePost = async (req, res) =>{
  try{
    const postNo = req.params.postno;

    const deletePost = await SharePost.destory({
      where: {
        id: postNo
      }
    }).then(() =>{
      res.json(deletePost);
    })

  }catch(error){
    console.log(error);
    res.status(500).json({ error : "서버 오류"})
  }
}