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

exports.logout = (req, res) => {
    req.logout(() => {
        res.json('ok')
    })
}