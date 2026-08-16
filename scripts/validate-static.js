const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const entryFile = path.join(projectRoot, 'deploy', 'index.html');

if (!fs.existsSync(entryFile)) {
  throw new Error('deploy/index.html을 찾을 수 없습니다.');
}

const html = fs.readFileSync(entryFile, 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);

if (!scriptMatch) {
  throw new Error('index.html에 실행 스크립트가 없습니다.');
}

try {
  new Function(scriptMatch[1]);
} catch (error) {
  throw new Error(`내장 JavaScript 문법 오류: ${error.message}`);
}

const disallowedDependency = /(https?:\/\/|fetch\s*\(|navigator\.geolocation|new\s+Notification\s*\(|getUserMedia|<img\b)/i;
if (disallowedDependency.test(html)) {
  throw new Error('외부 네트워크 또는 실제 기기 기능 의존성이 감지되었습니다.');
}

for (const requiredText of ['실종 알림 A', '실종 알림 B', '실종 알림 C', 'NF-20260816-014']) {
  if (!html.includes(requiredText)) {
    throw new Error(`필수 데모 문구가 없습니다: ${requiredText}`);
  }
}

console.log('NearFind static demo validation passed.');
