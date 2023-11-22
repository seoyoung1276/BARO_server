const express = require('express')
const session = require('express-session')
const passport = require('passport');
const { userController, logout, loginFailed } = require('../controllers/auth')
const router = express.Router()
const FRONT_URL = '';


router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));


router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login-failed'}),
    async (req, res) => { 
        try {
            console.log(req.user)
            res.redirect(`${FRONT_URL}/main.html`)
        }catch (error) {
            if(error && error.message) {
                res.status(401).send({ message: error.message });
            }else{
                console.log(error);
                res.status(500).send('Internal Server Error');
            }

        }
    }
)

router.get('/login-failed', loginFailed);

// 로그인한 유저 정보 조회 (내 정보)
router.get('/userinfo', userController);

// 로그아웃
router.post('/logout', logout);



module.exports = router