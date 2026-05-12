# 실행/빌드 가이드

Payorbit WebView 프론트엔드 앱을 로컬에서 실행하고 프로덕션 빌드하는 방법입니다.

## 1. 프로젝트 기준

- 프레임워크: React + Vite
- 패키지 매니저: npm
- lock 파일: `package-lock.json`
- 개발 서버 기본 주소: `http://localhost:5173`
- 빌드 결과물: `dist/`

## 2. 패키지 설치

처음 실행하거나 의존성이 변경된 경우 패키지를 설치합니다.

```bash
npm install
```

## 3. 개발 서버 실행

PC 브라우저에서 확인할 때는 기본 개발 서버를 실행합니다.

```bash
npm run dev
```

기본 접속 URL은 다음과 같습니다.

```text
http://localhost:5173
```

포트가 이미 사용 중이면 Vite가 다른 포트를 안내합니다. 터미널 출력의 `Local:` 주소를 확인해서 접속합니다.

## 4. Flutter WebView에서 접속

Flutter WebView에서 접근할 때 `localhost`는 실행 기기 자신을 의미합니다.

PC 브라우저:

```text
http://localhost:5173
```

Android Emulator:

```text
http://10.0.2.2:5173
```

실제 기기:

```text
http://{PC_IP}:5173
```

외부 기기에서 개발 서버에 접근하려면 host 옵션으로 실행합니다.

```bash
npm run dev:host
```

실제 기기에서는 PC와 기기가 같은 네트워크에 있어야 하며, 방화벽이 해당 포트 접근을 막지 않아야 합니다.

## 5. 프로덕션 빌드

프로덕션 빌드는 TypeScript 검증 후 Vite 빌드를 실행합니다.

```bash
npm run build
```

빌드 결과물은 다음 경로에 생성됩니다.

```text
dist/
```

## 6. 빌드 결과 확인

빌드된 결과물을 로컬 서버로 확인합니다.

```bash
npm run preview
```

기본 접속 URL은 Vite preview 터미널 출력의 `Local:` 주소를 확인합니다. 일반적으로 다음 주소를 사용합니다.

```text
http://localhost:4173
```

## 7. 환경변수

현재 필수 `.env` 값은 없습니다.

Vite 환경변수가 필요해지면 반드시 `VITE_` prefix를 사용합니다.

```bash
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_ENV=development
```

React 코드에서는 다음처럼 접근합니다.

```ts
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
```

운영 빌드용 값은 `.env.production`에 분리해서 관리합니다.

## 8. 빌드 전 체크리스트

- TypeScript 에러가 없는지 확인합니다.
- ESLint 스크립트가 추가되면 lint도 함께 실행합니다.
- `.env.production` 값이 실제 배포 환경에 맞는지 확인합니다.
- API Base URL이 개발/운영 환경에 맞는지 확인합니다.
- Flutter WebView redirect URL이 실제 접근 주소와 일치하는지 확인합니다.
- 임시 `console.log`나 mock 데이터가 남아 있지 않은지 확인합니다.

## 9. package.json 스크립트

현재 실행/빌드에 사용하는 스크립트입니다.

```json
{
  "scripts": {
    "dev": "vite",
    "dev:host": "vite --host 0.0.0.0",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

## 추가 조건
* 현재 프로젝트가 Vite인지 CRA인지 먼저 확인해라.
* Vite면 Vite 기준으로 작성해라.
* CRA면 CRA 기준으로 작성해라.
* package manager가 npm/yarn/pnpm/bun 중 무엇인지 lock 파일로 판단해라.
    * package-lock.json → npm
    * yarn.lock → yarn
    * pnpm-lock.yaml → pnpm
    * bun.lockb → bun
* 실제 프로젝트 구조와 package.json을 기준으로 문서를 작성해라.
* 추측으로 명령어를 쓰지 말고, 반드시 파일을 확인한 뒤 작성해라.
* Flutter WebView 환경까지 고려해서 작성해라.
* 초보 개발자도 바로 실행할 수 있도록 단계별로 작성해라.
