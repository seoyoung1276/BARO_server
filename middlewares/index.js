exports.isLoggedin = (req, res, next) =>{
    if (req.isAuthenticated()){
        next();
    }else{
        res.status(403).send("로그인 필요");
    }
}

exports.idNotLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated){
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다. ')
        res.redirect(`/?error=${message}`);
    }
}

exports.isError = ((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
})