const express = require('express')
const passport = require('passport');
const { isLoggedin } = require('../middlewares');
const router = express.Router()

router.get('/logout', isLoggedin, logout);

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get(
    'google/callback',
    passport.authenticate('google', { failureRedirecct: '/'}),
    (req, res) => { 
        res.redirect('/');
    }
)

module.exports = router