const express = require('express');
const router = express.Router();
const mysql = require("mysql");   // mysql 모듈 require
const bodyparser = require("body-parser");

// 커넥션 연결
let client = mysql.createConnection({
  user: "root",
  password: "123123", // 본인의 패스워드 입력
  database: "mysqltest"
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // res.render('product/edit', {  
  //   title: "Express"
  // });
}); // views 폴더 아래에 product 폴더가 있는 depth 구조에 edit.ejs 파일이 있다고 가정

router.get('/create', function(req, res, next) {
  client.query("SELECT * FROM products;", function(err, result, fields){
    if(err){
      //console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      res.render('create', { results: result });
    }
  });
});
/*create.ejs를 렌더링하는 GET 라우터는 쉽게 작성가능.
  쿼리를 작성하는 방법은 query() 메서드를 호출하여 인자로 쿼리 내용을 작성하면 됩니다.
  GET 라우터 함수는 products 테이블의 모든 상품을 조회하여, 
  웹 페이지에 JSON으로 반환하는 코드입니다.*/

router.post('/create', function(req, res, next) {
  var body = req.body;
  /*create.ejs의 input 태그 요소의 name 속성을 통해 POST 데이터를 가져올 수 있습니다.
    예를 들어, body.name, body.modelnumber, body.series는 input태그의 각 name입니다.*/

  client.query("INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)", [
    body.name, body.modelnumber, body.series
    /*이 때, 사용자가 어떤 입력 값을 전달할지 모르기 때문에 INSERT 쿼리를 작성 할 때 ? 키워드를 사용.
    
      각각의 ?는 client.query() 메서드의 두 번째 파라미터인 배열의 각 원소( input 태그의 각 name 속성 )가 대응되며,
      어떤 column에 들어갈 것인지는 VALUES 앞에 있는 칼럼에 대응되어 값이 저장됩니다.

      예를 들어, name 컬럼에는 body.name이 저장됩니다.*/
  ], function(){
    res.redirect('/create');
  });
});

module.exports = router;
