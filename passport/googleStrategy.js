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
                callbackURL: process.env.CALL_BACK,
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

                        if(email.includes('e-mirim.hs.kr')){

                        
                           const newUser = await User.create({
                                email: profile?.emails[0].value,
                                name: profile.displayName,
                                major: major,
                                snsId: profile.id,
                            });
                        
                            done(null, newUser);
                        }else{
                            console.error("이메일에 e-mirim.hs.kr이 포함되어있지 않음");
                            done(error);
                        }
                    }

                }catch(error){
                    console.error(error);
                    done(error);
                }
            },  
        ),
    );
};