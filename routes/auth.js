const express = require('express')
const passport = require('passport');
const { isLoggedin } = require('../middlewares');
const router = express.Router()


router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));


router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login-failed'}),
    (req, res) => { 
        res.send("성공")
    }
)

router.get('/', (req, res) => {
    res.send("성공")
})

router.get('/logout', isLoggedin, (req, res) =>{
    req.logOut();
    res.redirect('/');
});



module.exports = router