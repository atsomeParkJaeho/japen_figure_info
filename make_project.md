* 현재 프로젝트 아래 내용과 같이 만들어줘
1. 프론트개발 환경 react
    * 설치 라이브러리 : tailwind, axios, http-middleware, bootstrap
2. 백엔드 개발환경
    * node.js - nest.js(festify)
    * db : postgressql
        * db_name : japen_figure_info
        * user_id : jaeho
        * password : dnfldkQk2@
        * 테이블은 추후 추가 예정
** 개발환경 참고 사항 **
1. .env.dev, .env.prod 분리
    * .env.dev는 docker에서 실행될수 있게끔 환경 구성
    * .env.prod는 render에 배포 환경에 맞게 만들것
    * .env.dev, .env.prod 둘다 같은 크롤링 사용예정
2. 프로젝트 폴더 구성은 기본으로 회원가입, 로그인 기본 로직만 만들어줘(db에 테이블도 같이 추가)