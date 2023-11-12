const passport = require('passport');
const google = require('./googleStrategy');
require('dotenv').config();

const User = require('../models/users');

module.exports = () => {
    
    passport.serializeUser((user, done) =>{
        done(null, user.id);
    })

    passport.deserializeUser((id, done)=>{
        User.findOne({ where : { id }})
        .then(user => done(null, user))
        .catch(err => done(err))
    });

    google();
};