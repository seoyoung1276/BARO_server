const User = require('../models/users');

exports.getByUserNo = async (req, res) => {
    try {
        const UserNo = req.params.userno;
        const user = await User.findOne({ where: {user_no: UserNo}});
        
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ result : user })
    }catch (error){
        console.log(error);
        res.status(500).json({ error : "getbyuserNo 안됨"})
    }
    
}