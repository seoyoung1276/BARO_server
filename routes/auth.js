const express = require('express')
const session = require('express-session')
const passport = require('passport');
const { isLoggedin, isError } = require('../middlewares');
const { userController } = require('../controllers/auth')
const router = express.Router()
const FRONT_URL = 'http://localhost:5500'


router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));


router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login-failed'}),
    (req, res) => { 
        res.redirect(`${FRONT_URL}/main.html`)
    }
)

router.get('/userinfo', userController);

router.get('/logout', isLoggedin, (req, res) =>{
    req.logOut();
    res.redirect('/');
});



module.exports = router