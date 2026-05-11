# TASK

로그인 / 회원가입 기능을 구현하라.

이 작업은 단순 UI 구현이 아니라,
실제 운영 가능한 인증 시스템의 시작점이다.

반드시:
- 기존 프로젝트 구조를 분석하고
- 현재 패턴을 유지하며
- 재사용 가능한 구조로 설계하고
- 추후 확장을 고려한 형태로 구현해야 한다.

절대 임의로 새로운 패턴을 도입하지 마라.

---

# REQUIRED READING

구현 시작 전 반드시 읽고 준수:

- /harness/master.md

master.md의 규칙을 최우선으로 따른다.

특히:
- 아키텍처 규칙
- Drift Prevention Rules
- Output Format
- Review Checklist

를 반드시 준수한다.

---

# FEATURE GOAL

다음 기능을 구현하라.

## 로그인 페이지

### 기능
- 이메일 입력
- 비밀번호 입력
- 로그인 버튼
- 회원가입 이동 버튼

### 동작
- 로그인 버튼 클릭 시 API 호출
- 성공 시:
    - access token 저장
    - refresh token 저장
    - 홈으로 이동
- 실패 시:
    - 서버 에러 메시지 표시

### UX 요구사항
- 버튼 loading 처리
- 중복 요청 방지
- 입력 validation
- enter submit 지원
- 모바일 대응

---

## 회원가입 페이지

### 기능
- 이름 입력
- 이메일 입력
- 비밀번호 입력
- 비밀번호 확인 입력
- 회원가입 버튼

### validation
- 이메일 형식 검증
- 비밀번호 최소 길이 검증
- 비밀번호 확인 일치 검증

### 동작
- 회원가입 API 호출
- 성공 시 로그인 페이지 이동
- 성공 toast 표시
- 실패 시 서버 에러 표시

---

# TECH STACK

반드시 아래 기술만 사용:

- React
- TypeScript
- TanStack Router
- TanStack Query
- Zustand
- Styled Components

추가 라이브러리 도입 금지.

---

# ARCHITECTURE REQUIREMENTS

반드시 현재 프로젝트 패턴을 먼저 탐색하라.

특히 다음 항목을 먼저 분석:

- route 구조
- query/mutation hook 구조
- auth 관련 store 패턴
- api client 구조
- layout 구조
- form 처리 방식
- error handling 방식
- loading 처리 방식
- typography / spacing / color system

---

# IMPLEMENTATION REQUIREMENTS

## 1. Route

다음 route 생성:

- /auth/login
- /auth/signup

기존 TanStack Router code-based routing 규칙 유지.

---

## 2. API Layer

반드시:
- hooks/query 내부에서 API 처리
- component 내부 axios 호출 금지

예시:
- useLoginMutation
- useSignupMutation

기존 queryKey/mutation pattern 재사용.

---

## 3. Auth Store

반드시 기존 Zustand 패턴 분석 후 구현.

필요 시:
- accessToken 저장
- refreshToken 저장
- 로그인 상태 관리

localStorage persistence 패턴 재사용.

---

## 4. UI

반드시:
- 재사용 가능한 Input/Button 우선 탐색
- 기존 디자인 시스템 재사용
- styled-components 패턴 유지

금지:
- inline style
- CSS module
- Tailwind
- 임의 디자인 시스템 추가

---

# DESIGN REQUIREMENTS

디자인 방향:

- 모바일 우선
- 깔끔한 spacing
- 단순한 인증 UX
- 실제 서비스 수준
- excessive animation 금지

필요 시:
- loading state
- disabled state
- error state
- focus state
- keyboard 대응

모두 구현.

---

# SECURITY REQUIREMENTS

반드시 고려:

- token 저장 위치
- token 노출 방지
- refresh token 처리 구조
- unauthorized 대응 확장 가능성

현재는 최소 구현만 하되,
추후 interceptor 확장이 가능하도록 설계.

---

# FILE STRUCTURE RULES

기존 구조 우선.

새 파일 생성 전 반드시:
1. 기존 재사용 가능한 파일 탐색
2. 중복 여부 확인
3. 현재 naming convention 분석

---

# OUTPUT FORMAT

반드시 아래 형식으로 응답.

## 1. 프로젝트 구조 분석

- 현재 route 구조
- auth 구조
- api 구조
- 재사용 가능한 컴포넌트 분석

---

## 2. 구현 계획

- 생성 파일
- 수정 파일
- 재사용 패턴
- 상태 흐름

---

## 3. 구현

실제 코드 작성

---

## 4. 검증

반드시:
- 타입 검증
- edge case
- UX 검토
- 모바일 검토
- 중복 요청 검토
- token flow 검토

---

# DRIFT PREVENTION

절대 금지:

- 새로운 상태관리 도입
- react-hook-form 추가
- redux 추가
- tailwind 추가
- 구조 리팩토링
- 기존 naming 변경
- 기존 api response 구조 변경

---

# SUCCESS CRITERIA

다음을 만족해야 완료다.

- build 가능
- type-safe
- 모바일 대응
- 로그인 flow 정상 동작
- 회원가입 flow 정상 동작
- 기존 프로젝트 패턴 유지
- 재사용 가능한 구조
- 유지보수 가능한 코드

---

# IMPORTANT

AI의 목표는:
"예쁜 로그인 페이지 생성"이 아니다.

목표는:
"현재 프로젝트 구조를 유지하면서,
운영 가능한 인증 시스템의 기반을 안정적으로 추가하는 것"

이다.

반드시:
- 기존 패턴을 따르고
- 작은 변경으로 구현하며
- 유지보수 가능한 코드만 작성하라.