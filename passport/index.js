const passport = require('passport');
const session = require('express-session');
const google = require('./googleStrategy');
require('dotenv').config();

const User = require('../models/users');

module.exports = () => {
    
    passport.serializeUser((user, done) =>{
        done(null, user.email);
    })

    passport.deserializeUser((email, done)=>{
        User.findOne({ where : { eamil }})
        .then(user => done(null, user))
        .catch(err => done(err))
    });

    google();
};