const express = require('express')
const passport = require('passport');
const axios = require('axios');
const { isLoggedin } = require('../middlewares');
const router = express.Router()

// router.get('/logout', isLoggedin, (req, res) =>{
//     req.logOut();
//     res.redirect('/');
// });

router.get('/google', function(req, res, next) {  // GET /auth/google
    passport.authenticate('google', { scope: ['profile', 'email']}) (req, res, next);
});


router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirecct: '/'}),
    async (req, res, next) => { 
        return res.status(200).redirect(frontURL)
    }
)

// router.post('/auth/google', async (req, res) => {
//     const { accessToken } = req.body;

//     try {
//         const response = await axios.get(
//             `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
//         );

//         const userData = response.data;
//         res.status(200).json({ userData });
//     } catch (error){ 
//         console.error('Error fetching user data:', error);
//         res.status(500).json({ error: 'Failed to fetch user data' });
//     }
// })

// router.get('/', (req, res) => {
//     res.send("되냐?");
// })


module.exports = router