const User = require('../models/users');

const userController = async (req, res) => {
    try{
    const currentUser = req.user;
    if(!req.user) {
        return res.status(401).send("authenticateFailedUser");
    }
    const userInfo = await User.findOne({
        where: { email: currentUser.email},
    });
    const { dataValues } = userInfo;
    const user = {...dataValues};
    res.status(200).json(user);
    
    }catch (error){
        console.log(error);
        res.status(500).json({ error : error})
    }
}

module.exports = { userController };