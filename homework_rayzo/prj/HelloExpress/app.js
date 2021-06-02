var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test'); // 미들웨어 등록

var app = express();

const models = require("./models/index.js");

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 뷰 페이지의 폴더 기본 경로로 __dirname(현 JS의 경로) + views 이름의 폴더를 사용하겠다는 의미입니다.
/* 예를 들어, express-generator로 애플리케이션 명을 foo로 작성했을 경우, 
 foo/views 폴더가 뷰 폴더의 기본 경로가 됩니다.*/

app.set('view engine', 'ejs');
// 뷰 엔진으로 ejs를 사용하겠다는 의미입니다.
/* express-generator로 프로젝트를 생성할 때 express 프로젝트명 --view=ejs 과 같이 
ejs 엔진을 선택했다면, view engine으로 ejs가 설정됩니다.*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// public 폴더에 대한 접근을 가상 경로인 /로 설정함.

/* 이와 마찬가지로 가상경로를 설정한다면, 다음과 같이 작성할 수 있습니다.
app.use('/upload', express.static('uploads'))

위 코드의 의미는 uploads 폴더에 대한 가상 경로로 /upload를 사용하겠다는 의미입니다.
그러면 개발을 할 때 uploads 폴더에 접근할 일이 있을 때, 
상대 경로로 접근하는 것이 아니라 /upload 경로로 접근을 할 수 있습니다. */

app.use(session({
  key: 'sid',    //키값
  secret: 'secret',   //세션 비밀키
  resave: false,    // 세션 항시 저장여부
  saveUninitialized: true,   // 세션이 저장되기전에 uninitialize 상태로 만들어 저장
  cookie: {   
    maxAge: 24000 * 60 * 60 // 쿠키 설정 (유효기간 24시간)
  }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
// 라우터 함수인 testRouter 변수의 경로를 /test 라는 가상 경로로 사용하겠다고 선언

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
