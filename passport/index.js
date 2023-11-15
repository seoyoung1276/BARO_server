const passport = require('passport');
const session = require('express-session');
const google = require('./googleStrategy');
require('dotenv').config();

const User = require('../models/users');

module.exports = () => {
    
    passport.serializeUser((user, done) =>{
        done(null, user.user_no);
    })

    passport.deserializeUser((user_no, done)=>{
        User.findOne({ where : { user_no }})
        .then(user => done(null, user))
        .catch(err => done(err))
    });

    google();
};