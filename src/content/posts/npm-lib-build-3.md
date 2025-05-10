---
title: "(3장) Dual Package 지원하기"
date: "2024-05-10"
---

이전 포스팅에서는 package.json의 type 속성과 실제 사용한 Module Resolution이 일치하지 않을 때 발생하는 문제를 살펴봤습니다.

저는 ESM만을 지원하도록 type: "module"로 설정해서, ESM 전용 모듈을 만들었는데요. 하지만 여전히 CJS를 사용하는 환경이 많기 때문에, 가능하다면 ESM과 CJS 모두를 지원해주는 것이 더 실용적입니다.

이를 위해서는 ESM으로 작성한 JavaScript 코드를 CJS 방식으로도 변환해주는 과정이 필요합니다.

이 작업을 도와주는 툴은 여러 가지가 있지만, 이번 포스팅에서는 ESBuild를 사용해보겠습니다.

일단 ESBuild를 설치해줍니다.

```bash
npm i esbuild -D
```

```json
{
  "name": "tomato-spoon",
  "version": "1.0.1",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "publish": "npm publish --access=public",
    "build": "npm run cjs:build && npm run esm:build",
    "cjs:build": "esbuild index.js --outfile=dist/out.cjs --format=cjs",
    "esm:build": "esbuild index.js --outfile=dist/out.mjs --format=esm"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "esbuild": "^0.25.4"
  }
}
```

이렇게 코드를 작성한 뒤 실행시켜줍니다.

```bash
npm run build
```

그러면 dist/ 폴더 하위에 cjs, mjs 파일이 생깁니다.
하지만 이렇게한 뒤 적절한 파일이 매칭되게 하려면 package.json에도 수정이 필요합니다.

```json
{
  "name": "tomato-spoon",
  "version": "1.0.1",
  "description": "",
  "main": "dist/out.cjs",
  "module": "dist/out.mjs",
  "scripts": {
    "publish": "npm publish --access=public",
    "build": "npm run cjs:build && npm run esm:build",
    "cjs:build": "esbuild index.js --outfile=dist/out.cjs --format=cjs",
    "esm:build": "esbuild index.js --outfile=dist/out.mjs --format=esm"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "esbuild": "^0.25.4"
  }
}
```

위험성에 관련한 내용 추가적으로 작성하기 (conditional export)

- https://lurgi.tistory.com/186
