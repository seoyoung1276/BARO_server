const passport = require('passport');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

const User = require('../models/User');

module.exports = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: '13.125.87.160:3000/auth/google/callback',
                scope: ['profile', 'email']
            },
            async (accessToken, refreshToken, profile, done) =>{
                console.log('google profile : ', profile);
                try{
                    const exUser = await User.findOne({
                        where: {
                            email: profile.emails[0].value,
                        },
                    });
                    
                    if(exUser) {
                        return done(null, exUser);
                    } else {
                        const email = profile.emails[0].value;
                        const firstWord = email.split('')[0];
                        let major = "";
                        if(firstWord === 's'){
                            major = "뉴미디어소프트웨어과";
                        }else if(firstWord === 'w'){
                            major = "뉴미디어웹솔루션과";
                        }else{
                            major = "뉴미디어디자인과";
                        }
                        
                        const newUser = await User.create({
                            email: profile?.emails[0].value,
                            name: profile.displayName,
                            major: major,
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