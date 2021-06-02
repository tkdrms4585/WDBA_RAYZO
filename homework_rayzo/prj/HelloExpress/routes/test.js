// 새로운 미들웨어(라우터) 등록

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('새 라우터 입니다.');
}) // 테스트를 위해 브라우저에서 localhost:3000/test로 접근

router.get("/hahaha", function(req, res, next){
    res.send("새로운 라우터가 등록되었습니다.!")
}) // 테스트를 위해 브라우저에서 localhost:3000/test/hahaha로 접근

module.exports = router;

/*이 모듈의 반환 객체는 router 이어야 함을 꼭 기억해주세요!
  그래야 라우터 미들웨어로 등록할 수 있습니다.*/