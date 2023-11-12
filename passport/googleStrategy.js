const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const user = require('../models/users');

module.exports = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: "25147128929-gr887lq0ggg3dgatab1nmekelq0pr0dn.apps.googleusercontent.com",
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: 'auth/google/callback'
            },
            async (accessToken, refreshToken, profile, done) =>{
                console.log('google profile : ', profile);
                try{
                    const exUser = await user.findOne({
                        where: {snsId: profile.id },
                    });
                    
                    if(exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await user.create({
                            email: profile?.email[0].value,
                            nick: profile.displayName,
                            snsId: profile.id,
                        });
                        done(null, newUser);
                    }

                }catch(error){
                    console.error(error);
                    done(error);
                }
            },  
        ),
    );
};