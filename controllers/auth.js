const User = require('../models/User');

// 유저 정보 조회
exports.userController = async (req, res) => {
    try{
        if(await req.isAuthenticated()){
            res.json(req.user);
        } else {
            console.log(error)
            res.status(401).json({ message: 'USER not authe어쩌구 암튼 존재안함'})
        }

    }catch(error){
        res.status(500).json({message : error})
    }
}

exports.loginFailed = async (req, res) => {
    res.send("<script>alert('미림마이스터고 학교 계정으로만 가입할 수 있습니다.'); window.location.replace('index.html');</script>");
}

exports.logout = (req, res) => {
    req.logout(() => {
        res.json('ok')
    })
}