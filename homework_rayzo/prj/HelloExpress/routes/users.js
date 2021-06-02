var express = require('express');
const crypto = require('crypto');
var router = express.Router();
const models = require("../models");

/* 메인 페이지 */
router.get('/', function(req, res, next) {
  if(req.cookies){
    console.log(req.cookies);
  }
  res.send('respond with a resource');
});

router.get("/foo", function( req, res, next ){
  res.send('foo~~!');
}); // 이런식으로 라우터 함수를 추가하면 
    // http://localhost:3000/users/foo 와 같이 요청할 수 있습니다.

router.get('/sign_up', function(req, res, next) {
  res.render("user/signup");
});

router.post("/sign_up", function(req, res, next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  models.user.create({
    name: body.userName,
    email: body.userEmail,
    password: hashPassword,
    salt: salt
  })
  .then( result => {
    res.redirect("/users/sign_up");
  })
  .catch( err => {
    console.log(err)
  })
})

// 로그인 GET
router.get('/login', async function(req, res, next) {
  // 세션 초기설정
  let session = await req.session;

  if (req.session) {
    res.render("user/login", {
        session : session
    });
  } else {
    console.log("재확인");
    res.redirect("/users/login")
  }
});

// 로그아웃 GET
router.get("/logout", function(req,res,next){
if(req.session) {
  req.session.destroy( err =>{
    if(err) throw err;
    console.log('세션 삭제하고 로그아웃됨');
    res.clearCookie('sid');
    res.redirect('/users/login');
  });
}
else{
  console.log('로그인 상태 아님');
  res.redirect("/users/login")
}  
})


// 로그인 POST
router.post("/login", async function(req,res,next){
  let body = req.body;

  let result = await models.user.findOne({
      where: {
          name: body.userName,
          email : body.userEmail
      }
  });

    let dbPassword = result.dataValues.password;
    let inputPassword = body.password;
    let salt = result.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    if(dbPassword === hashPassword){
        console.log("비밀번호 일치");
        req.session.name = body.userName;
        // 세션 설정
        req.session.email = body.userEmail;
        res.render("user/login");
    }
    else{
        console.log("비밀번호 불일치");
        res.redirect("/users/login");
    }
});

module.exports = router;
