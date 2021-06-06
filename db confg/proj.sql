`sequelize로 데이터베이스 생성`
회원: 이멜(PK), 암호화 된 비번, 솔트,  이름, 생년월일
게시판: 이멜(PK), 이름, 제목, 내용 댓글, 작성시간, 수정시간

----------------------------- 데이터 베이스 생성 -------------------------------
CREATE SCHEMA `proj` DEFAULT CHARACTER SET utf8;
use proj; -- 데이터베이스 사용하겠다는 의미
show databases;로 생성 확인
show tables;(아무것도 없을거임.)

------------------------------ model 작성 (테이블 작성)----------------------------------
cli 생성법 
 - sequelize model:create --name TABLE_NAME --attributes "COLUMN1:type, COLUMN2:type, COLUMN3:type"

* 데이터 타입(위 생성법의 type 부분)

STRING
 - 변하는 길이의 문자열
CHAR
 - 고정된 길이의 문자열
TEXT
 - 제한되지 않은 길이의 텍스트
 - tiny, medium, long 으로 길이 설정가능
INTEGER
 - 32 bit Integer
BIGINT,  FLOAT,  DOUBLE,  DECIMAL
BOOLEAN
DATE
JSON
 - PostgreSQL 지원
ARRAY
 - PostgreSQL 지원
GEOMETRY
등....

'sequelize.define( "객체이름", 스키마 정의, 테이블 설정 )
세 번째 인자인 테이블 설정 부분에서 tableName: "user"으로 작성했기 때문에, 테이블 이름은 user가 됩니다.
즉, DB에 user라는 테이블을 정의하고, 이는 User라는 객체로 매핑됩니다.'
npm start 로 테이블 생성
- cli로 테이블을 생성하면 자동으로 테이블명을 복수형으로 만들어줌..
- cli를 통해 모델을 생성하면, 3개의 필드(id, createdAt, updatedAt 컬럼)를 자동으로 생성
- migration 파일을 생성

cli로 모델을 생성하면, 컬럼의 옵션은 모두 기본 값으로 정의

https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
------------------------- Migration 작업 ---------------------------
`sequelize db:create` : DB를 생성합니다.

migration이란 "up"기능과 "down"기능을 가진 일련의 데이터베이스 작업입니다.

"up"은 데이터베이스를 변경
 - `sequelize db:migrate` 명령어 실행 시, up에 정의된 코드 실행
"down"은 "up"이 실행되기 전의 상태로 데이터베이스를 복원
 - `sequelize db:migrate:undo` 명령어 실행 시, down에 정의된 코드 실행

따라서 정리하면, migration한 상태에서 내용을 수정하기 위한 과정은 다음과 같습니다.

1. sequelize db:migrate:undo 명령어 실행
   - sequelize db:migrate:undo:all 을 명령하면 모든 migration파일에 대해서 
     각 파일의 down에 정의된 코드가 실행됩니다.
2. migration 파일과 /models/user2.js의 내용을 맞춘다.
3. sequelize db:migrate를 명령어를 실행하면, migration이 create 되면서 내용이 맞춰짐.

*** error ***

혹시 migration 파일을 삭제하셨으면, 
"ERROR: Unable to find migration: 20171108014301-create-user-2.js"과 같은 메시지가 출력.
그러면 위의 파일명을 가진 skeleton을 생성하면 해결.

즉, 아래의 명령어를 실행하고, 생성된 파일의 이름을 20171108014301-create-user-2.js로 수정하면 된다.
# sequelize migration:create 20171108014301-create-user-2


--------------------------- seeder 생성 ------------------------------
* Seeder는 DB를 생성하자마자 필수적으로 가지고 있어야 하는 정적 데이터를 넣을때 사용

`sequelize seed:generate --name [데이터 이름]`
`sequelize seed:generate --name dummy-data`
코드 작성 후 
`sequelize db:seed:all` 명령어를 통해 작성한 시드파일을 DB에 적용


----------------------------------------------------------------------------


모델 정의 옵션

모델을 정의할 때 사용할 수 있는 여러 옵션들에 대해 알아보도록 하겠습니다.


* 대표적인 필드 옵션
   (필드의 속성값)

type
 - Data type을 의미
primaryKey
 - 기본키 인지 아닌지 설정 ( default: false )
autoIncrement
 - SERIAL( auto increment )인지 아닌지 ( default: false )
allowNull
 - NOT NULL 조건인지 아닌지 ( default: true )
unique
 - Unique 조건인지 아닌지에 대한 옵션
comment
 - column에 대한 comment
validate
 - 각 column에 대한 validation check 옵션을 설정
 - 이메일 형식만 저장할 수 있도록 하거나, 숫자만 저장하는데 문자를 저장할 경우를 
   막을 수 있도록 하는 것이 그 예입니다.


3. config(모델의 설정?)

timestamps
 - Sequelize는 테이블을 생성한 후 자동적으로 createdAt, updatedAt column을 생성합니다.
    - Database에 해당 테이블이 언제 생성되었고 가장 최근에 수정된 시간이 언제인지 추적할 수 있도록 해줍니다.
 - 기능을 끄려면 false로 설정하면 됩니다.
paranoid 
 - paranoid가 true로 설정하면, deletedAt column이 table에 추가됩니다.
 - 해당 row를 삭제시 실제로 데이터가 삭제되지 않고 deletedAt에 삭제된 날짜가 추가되며, 
   deletedAt에 날짜가 표기된 row는 find 작업시 제외됩니다.
 - 즉, 데이터는 삭제되지 않지만 삭제된 효과를 줍니다.
 - 이 옵션은 timestamps 옵션이 true여야만 사용할 수 있습니다.
underscored
 - 이 옵션이 true이면 column이름을 camalCase가 아닌 underscore방식으로 사용합니다.
freezeTableName
 - Sequelize는 define method의 첫 번째 파라미터 값으로 tablename을 자동 변환하는데, 
   이 옵션의 값이 true이면 변환 작업을 하지 않도록 합니다.
tableName
 - 실제 Table 이름 정의
comment
 - table 에 대한 주석