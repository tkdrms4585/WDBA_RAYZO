https://victorydntmd.tistory.com/16?category=677306 참고 블로그.

모듈이란 "독립된 기능을 갖는 것(함수, 파일)들의 모임"

모듈 생성하기
   * exports / module.exports
      - exports는 module.exports를 참조합니다.
      - 일반적으로 module.exports를 통해 모듈을 생성합니다.
모듈 불러오기
   * require("모듈 파일 경로")


Express란?

Node는 Express, Koa, Hapi와 같은 프레임워크를 사용하여 개발할 수 있습니다.

위의 프레임워크들이 개발에 필요한 다양한 기능들을 지원하기 때문에, 개발 생산성이 높아지기 때문.


미들웨어

router 함수의 콜백 함수를 보면 매개변수로 req, res, next가 있는데, 여기에 미들웨어의 개념이 깔려있습니다.

미들웨어란, 자기가 수행 할 부분을 수행하고 다음 과정으로 진행을 넘기는 것을 의미합니다.


※ 미들웨어를 사용하는 이유는 어떤 미들웨어에서 req, res 객체에 
   속성 또는 메서드를 추가했을 때, 다른 미들웨어서도 
   이전 미들웨어에서 추가한 req, res 객체의 속성 또는 메서드를 사용할 수 있기 때문입니다.

※ 따라서 npm start로 서버가 실행되면 app.js에서 등록된 미들웨어들이 수행이 되고,
   /routes/index.js 파일의 router 미들웨어에서는 app.js에서 req, res 객체에 
   추가했던 프로퍼티, 메서드들을 사용할 수 있게 됩니다.



미들웨어 종류

다음으로 미들웨어에는 어떤 것들이 존재하는지 살펴보겠습니다.
아래의 미들웨어 외에도 무수히 많은 미들웨어가 있으며, 
단지 어떤 미들웨이들이 있는지 대충 감을 잡기 위한 용도로 정리해봤습니다.

router
      - 라우팅 역할을 하는 미들웨어 입니다.
      - URL 경로와 렌더링할 페이지를 작성합니다.
static
      - 지정한 폴더에 있는 내용들을 웹 서버 루트 폴더에 모두 올립니다.
cookieParser
      - 요청 쿠키를 추출하는 미들웨어입니다.
      - 이 미들웨어를 사용하면 req와 res 객체에 cookies 속성과 
        cookie() 메서드가 추가되므로, 쿠키를 다룰 수 있게 됩니다.
bodyParser
      - POST 요청 데이터를 추출하는 미들웨어입니다.
      - 이 미들웨어를 사용하면 req 객체에 body 속성이 추가됩니다.
connect-multipart
      - 일반적인 form 입력 양식의 인코딩 방식
            - application/x-www-form-urlencoded
      - 파일 전송 form 입력 양식의 인코딩 방식
            - multipart/form-data
      - 때문에 body-parser 미들웨어는 파일 전송 인코딩 방식을 지원하지 않으므로, 
        파일 전송을 위해서는 connect-multipart 미들웨어를 사용해야 합니다



req, res 객체

마지막으로 express-generator로 생성한 미들웨어의 req, res 객체에는 
어떤 메서드가 존재하는지 살펴보겠습니다.


1) res객체 메서드

send( [body] )
      - 매개변수의 자료형에 따라 적절한 형태로 응답
      - 문자열 – HTML
      - 배열 – JSON
      - 객체 – JSON
status( [상태코드] ).send( [body] )
      - 상태 코드와 함께 응답
json( [body] )
      - JSON 형태로 응답
redirect([ body] )
      - 해당 경로로 redirect


2) req객체 메서드

params()
      - 라우팅 매개변수를 추출
query()
      - 요청 매개변수를 추출
headers()
      - 요청 헤더를 추출
header()
      - 요청 헤더의 속성을 지정하여 추출
accepts( type )
      - 요청 헤더의 Accept 속성을 확인
is( type )
      - 요청 헤더의 Content-Type 속성을 확인



폴더, 파일의 주요 역할

express-generator로 애플리케이션을 생성하면, 아래와 같은 폴더/파일들이 자동으로 추가됩니다.


bin 폴더
   - 프로그램의 실행과 관련된 파일이 있는 폴더입니다.
   - www 파일(서버를 실행시키는 파일)을 실행해서 서버가 실행됩니다.
   - 또한 /bin/www.js 파일에서 Node 서버가 실행되는 
     포트 설정과 서버의 이벤트 핸들링을 작성
pulbic 폴더
   - JS, CSS, img 파일 등 리소스 파일이 있는 폴더
routes 폴더
   - 라우터와 관련된 모듈이 있는 폴더
views 폴더
   - ejs 파일과 같은 템플릿 파일이 있는 폴더
app.js 파일
   - 애플리케이션에서 중심이 되는 파일, 
     express의 환경 설정, 미들웨어 등록 등 서버 운영에 필요한 코드를 작성
   - 서버 설정 / 미들웨어 정의 / 라우트 정의 등 여러가지를 설정하고, 
     서버 운영을 위한 로직을 작성합니다.
package.json
   - 현재 애플리케이션과 관련된 정보와 모듈을 설치하는데 필요한 의존성이 작성된 파일



MYSQL 모듈

Node.js에서 MySQL을 사용하려면 mysql 모듈을 설치해야하고,
물론 윈도우 또는 리눅스 등에도 MySQL이 설치되어 있어야 합니다.

# npm install mysql

그래야 mysql 모듈의 createConnection() 메서드를 통해 MySQL과 커넥션을 맺을 수 있습니다.


createConnection(options) 메서드를 호출할 때, 인자로 커넥션과 관련된 DB 정보를 넘겨주는데, 
options에 부여할 수 있는 속성은 다음과 같습니다.

host
  - 연결할 호스트
port
  - 연결할 포트
user
  - 사용자 이름(필수 입력 값)
password
  - 사용자 비밀번호(필수 입력 값)
database
  - 연결할 데이터베이스
debug
  - 디버그 모드를 사용할 것인지


데이터 조회 및 추가

/views/create.ejs

위와 같이 form 요소가 추가되어, "전송하기" 버튼을 누르면 
/create 경로에 POST 방식으로 요청을 보내게 됩니다.


그 전에, create.ejs를 렌더링 해주는 GET 요청을 처리해주는 라우터가 필요하고,

product 테이블에 데이터를 추가해주는 POST 요청을 처리해주는 라우터가 필요합니다.

/routes/index.js 파일에 이에 대한 라우터 함수를 추가적으로 등록 필요.

http://localhost:3000/create 로 확인가능



*** Error ***

ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

서버 실행시 위와 같은 에러가 발생한다면, MySQL에서 아래의 명령어를 실행하면 해결됩니다. ( 참고 링크 )
아마 MySQL 버전이 8.x일 때 발생하는 문제 같습니다.

# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '새로운 비밀번호';
# flush privileges;



ORM( Object Relational Mappings )이란 프로그램 상의 객체(Object)와 
DB의 테이블(Relation)이 일대일 대응하는 관계를 맺는 것(Mapping)을 의미.

쉽게 받아들이려면, ORM에서 "객체 == 테이블"라고 생각해도 무방.


ORM을 이용하면 query가 아닌 메서드로서 데이터를 조작할 수 있다는 것이 큰 장점입니다.

예를 들면, User 테이블의 데이터를 조회하기 위해,

MySQL
  - SELECT * FROM user; 쿼리 실행
ORM
  - User 테이블과 매핑된 객체를 user라 할 때, user.findAll(); 라는 메서드 호출

이렇게 ORM에서는 테이블과 매핑되는 객체의 메서드를 통해 쿼리를 조작합니다.



Sequelize는 Node.js기반의 ORM으로 Promise 문법을 사용

ORM의 특징은 특정 DB에 종속되지 않는다는 것.

즉, DB와 커넥션만 연결되면 어떤 DB를 사용하던지 상관없이 동일한 메서드로 쿼리 수행이 가능.


sequelize-cli 모듈은 sequelize를 조금 더 효율적으로 사용하기 위해서 
몇 개의 폴더와 파일( 스켈레톤 )을 생성



/config/config.js
  - sequelize를 사용하기 위해 환경을 설정하는 부분

/models/index.js
  - Model을 정의하고 관계를 설정해주는 역할



sync() 메서드를 호출하여, sequelize 실행 테스트

sequelize는 CRUD의 데이터 조작( DML : Data Manipulation Language ) 뿐만 아니라, 
데이터 정의( DDL : Data Definition Language )도 지원합니다.


따라서 이미 만들어진 테이블에 Model을 매핑할 수 있을 뿐만 아니라, 
DB에 테이블이 없는 상태라면 정의한 Model을 바탕으로 테이블을 생성할 수도 있습니다.

이를 수행하는 메서드가 sync() 이며, sync()는 모델에서 정의한 
이름을 갖는 테이블이 존재하지 않을 경우에만 동작합니다.


쉽게 말하면, /models/index.js 파일에서 정의한 모델들을 바탕으로 실제로 Model을 등록하는 일을 합니다.

따라서 sync() 메서드를 호출하면 모델을 사용할 준비가 되는 것입니다.


