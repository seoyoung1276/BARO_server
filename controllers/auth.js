const User = require('../models/users');

// 유저 정보 조회
const userController = async (req, res) => {
    try{
        if(req.isAuthenticated()){
            res.json(req.user);
        } else {
            console.log(error)
            res.status(401).json({ message: 'USER not authe어쩌구 암튼 존재안함'})
        }

    }catch(error){
        res.status(500).json({message : error})
    }
}

module.exports = { userController };