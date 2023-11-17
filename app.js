const express = require('express');
const passport = require('passport')
const passportConfig = require('./passport');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const routes = require('./routes')



// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { db } = require('./models');

const app = express();
passportConfig();

const whiteList = [
   'http://localhost:5500', 
   'http://127.0.0.1:5500', 
   'http://ec2-13-125-87-160.ap-northeast-2.compute.amazonaws.com',
   'http://13.125.87.160'
];

const corsOptions = {
   origin: whiteList,
   credentials: true
}

app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
   session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
         httpOnly: false,
         secure: false,
      },
   }),
)

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.set('port', process.env.PORT || 3000);

// 서버 실행
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기 중');
});