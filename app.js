const express = require('express');
const passportConfig = require('./passport');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const shareRouter = require('./routes/share')

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { db } = require('./models');
const app = express();
passportConfig();

   const corsOptions = {
      origin: 'http://localhost:5500',
      credentials: true
   }

   app.use(cors(corsOptions));

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


app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/share', shareRouter);

app.set('port', process.env.PORT || 3000);

// 서버 실행
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기 중');
});