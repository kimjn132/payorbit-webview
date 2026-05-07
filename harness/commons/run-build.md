# React 프로젝트 Run & Build 가이드 작성 프롬프트
너는 React/Vite 기반 프론트엔드 프로젝트를 안정적으로 실행하고 빌드할 수 있도록 돕는 시니어 프론트엔드 엔지니어다.
현재 프로젝트의 목적은 Flutter WebView에서 사용할 React 웹앱을 개발하는 것이다.
---
# 목표
프로젝트에 다음 내용을 포함한 실행/빌드 가이드를 작성해라.
---
# 작성해야 할 내용
## 1. 프로젝트 실행 방법
- 패키지 설치 명령어
- 개발 서버 실행 명령어
- 실행 후 접속 URL
- 포트가 다를 경우 확인 방법
- `.env` 파일이 필요한 경우 예시 작성
  예시:
```bash
npm install
npm run dev
```
개발 서버 기본 주소:

http://localhost:5173

⸻

2. 프로젝트 빌드 방법

* 프로덕션 빌드 명령어
* 빌드 결과물 위치
* 빌드 결과물을 로컬에서 확인하는 방법

예시:

npm run build
npm run preview

빌드 결과물:

dist/

⸻

3. package.json 스크립트 확인

package.json의 scripts를 확인해서 실제 프로젝트에 맞는 명령어를 사용해라.

필수로 확인할 항목:

{
  "scripts": {
    "dev": "...",
    "build": "...",
    "preview": "..."
  }
}

만약 스크립트가 없다면 아래 기준으로 추가해라.

Vite 기준:

{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}

⸻

4. 환경변수 가이드

Vite 프로젝트라면 환경변수는 반드시 VITE_ prefix를 사용해야 한다.

예시:

VITE_API_BASE_URL=http://localhost:8080
VITE_APP_ENV=development

React 코드에서는 아래처럼 접근한다.

import.meta.env.VITE_API_BASE_URL

⸻

5. Flutter WebView 연동 시 주의사항

Flutter WebView에서 접근할 경우 localhost는 기기 기준이므로 주의한다.

* PC 브라우저:

http://localhost:5173

* Android Emulator:

http://10.0.2.2:5173

* 실제 기기:

http://{PC_IP}:5173

Vite 개발 서버를 외부 기기에서 접근하려면 아래처럼 실행해야 한다.

npm run dev -- --host 0.0.0.0

또는 package.json에 추가한다.

{
  "scripts": {
    "dev:host": "vite --host 0.0.0.0"
  }
}

⸻

6. 빌드 전 체크리스트

빌드 전에 아래 항목을 점검해라.

* TypeScript 에러가 없는가?
* ESLint 에러가 없는가?
* .env.production 값이 올바른가?
* API Base URL이 운영/개발 환경에 맞는가?
* WebView에서 사용하는 redirect URL이 올바른가?
* console.log, 임시 mock 데이터가 남아있지 않은가?

⸻

7. 결과물

최종 결과물은 아래 경로에 생성해라.

docs/run-build.md

문서는 초보자도 따라할 수 있도록 작성하되, 불필요하게 장황하지 않게 작성해라.

⸻

추가 조건

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

