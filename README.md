# japen_figure_info

## 구성

- `frontend/` — React (Vite) + Tailwind CSS + Bootstrap + axios + react-router-dom
  - 로그인/회원가입 페이지, API 프록시(`http-proxy-middleware`)
- `backend/` — NestJS (Fastify) + TypeORM + PostgreSQL
  - `auth` (회원가입/로그인/JWT), `users`, `crawler`(공용 크롤링 서비스, axios+cheerio)

## 로컬 개발 (Docker)

```bash
docker compose up --build
```

- frontend: http://localhost:5173
- backend: http://localhost:3000
- db: localhost:5432 (`japen_figure_info` / `jaeho`)

`backend/.env.dev`, `frontend/.env.dev` 값을 사용합니다. (커밋되지 않음 — `.env.*.example` 참고)

## 개별 실행 (Docker 없이)

```bash
cd backend && npm install --legacy-peer-deps && npm run start:dev
cd frontend && npm install --legacy-peer-deps && npm run dev
```

PostgreSQL은 별도로 실행 중이어야 하며, `backend/.env.dev`의 `DB_HOST`를 `localhost`로 바꿔주세요.

## 배포 (Render)

- `backend/.env.prod`, `frontend/.env.prod`를 참고해 Render 대시보드에 실제 값을 설정하세요.
- 크롤링 로직은 dev/prod 환경 모두 `backend/src/crawler`의 동일한 서비스를 공유합니다.

## DB

- `users` 테이블은 `User` 엔티티(`backend/src/users/user.entity.ts`)로 정의되어 있으며, 개발 환경에서는 TypeORM `synchronize`로 자동 생성됩니다.
- 이후 필요한 테이블은 `backend/src/**/*.entity.ts`에 추가하세요.
