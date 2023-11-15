const express = require('express')
const passport = require('passport');
const { isLoggedin } = require('../middlewares');
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

router.get('/logout', isLoggedin, (req, res) =>{
    req.logOut();
    res.redirect('/');
});



module.exports = router