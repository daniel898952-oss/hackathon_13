# NearFind Vercel 배포

이 프로젝트는 브라우저에서 실행되는 정적 데모입니다. Node.js는 로컬 실행, 배포 전 검증, Vercel CLI 실행에만 사용하며 Vercel 프로덕션에는 `deploy/` 디렉터리만 공개됩니다.

## 사전 조건

- Node.js 22 LTS
- Vercel 계정 로그인: `npx vercel login`

## 명령

```bash
npm run validate
npm run dev
npm run deploy:preview
npm run deploy:production
```

첫 배포에서 CLI가 팀과 프로젝트 이름을 묻습니다. GitHub 저장소 연동을 선택하면 이후 `master` 브랜치 푸시마다 Vercel이 자동으로 재배포합니다.

## Vercel 설정

- Framework Preset: `Other`
- Build Command: `node scripts/validate-static.js`
- Output Directory: `deploy`
- 환경 변수: 필요 없음

`vercel.json`이 위 설정을 저장소에 고정하므로 대시보드에서 별도 설정을 반복할 필요가 없습니다.
