const TogetherPost = require('../../models/TogetherPost'); 
const TogetherAttend = require('../../models/TogetherAttend');
const { post } = require('../../routes/together/post');

// 글 쓰기
exports.createPost = async (req, res) => {
  try {
    const { user_no, title, content, place, meet_date, Hire_personnel} = req.body;
      const newPost = await TogetherPost.create({
        user_no: user_no,
        title: title,
        content: content,
        place: place,
        meet_date: meet_date,
        Hire_personnel: Hire_personnel
      });
      res.json(newPost);

  } catch(error){
    console.log(error);
    res.status(500).json({ error : error });
  }
};


// 모든 글 불러오기
exports.getAllPost = async (req, res) => {
    try {
    const allPost = await TogetherPost.findAll({
    order: [['date', 'DESC']]
  });
    res.json(allPost)
    }catch (error){
        console.log(error);
        res.status(500).json({ error : error})
    }

}

// 글 하나 불러오기
exports.getOnePost = async (req, res) =>{
    try{
        const postno = req.params.postno
        const onePost = await TogetherPost.findOne({
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
    const getUserPost = await TogetherPost.findAll({
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

    const update = await TogetherPost.update(
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

    const deletePost = await TogetherPost.destroy({
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

// 참가하기
exports.addAttend = async (req, res) => {
  try{
      const postNo = req.params.postno;
      const {user_no} = req.body;
      const addAttend = await TogetherAttend.create({
        together_id: postNo,
        user_no: user_no
      }) 
      res.json(addAttend)
  }catch(error){
    console.log(error);
    res.status(500).json({ error : "서버 오류"})
  }
}

// 참가취소
exports.deleteAttend = async (req, res) => {
  try{
    const postNo = req.params.postno;
    const user_no = req.params.userno;
    const deleteAttend = await TogetherAttend.destroy({
      where : {
        together_id: postNo,
        user_no: user_no
      }
    })
      res.json(deleteAttend)
  }catch(error){
    console.log(error);
    res.status(500).json({ error: "서버 오류"})
  }
}

// 참가 목록 조회
exports.getAttend = async (req, res) => {
  try{
    const postNo = req.params.postno;
    const getAttend = await TogetherAttend.findAll({
      where: {
        together_id: postNo
      }
    })
    res.json(getAttend)
  }catch(error){
    console.log(error);
    res.status(500).json({ error: "서버 오류"})
  }
}

// 참가 했는지? 
exports.isAttend = async (req, res) => {
  try{
    const postNo = req.params.postno;
    const user_no = req.params.userno;
    const isAttend = await TogetherAttend.findOne({
      where: {
        together_id: postNo,
        user_no: user_no
      }
    })
      if(isAttend.length > 0){
        res.json({ result : true})
      }else{
        res.json({ result : false})
      }
  }catch(error){
    console.log(error);
    res.status(500).json({ error : "서버 오류"})
  }
}