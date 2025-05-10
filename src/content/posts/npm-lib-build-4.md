---
title: "(4장) TypeScript 지원하기"
date: "2024-05-10"
---

이전 포스팅에서는 CJS, ESM을 모두 지원해주는 Dual Package를 만드는 방법을 배웠습니다.

TypeScript 지원도 한 번 해보겠습니다.

```terminal
tsc --init
```

그리고 기존에 있던 파일을 Typescript파일로 변경해줍니다.

```typescript:index.ts
export function getName(): string {
  return "tomato-spoon";
}
```

ESBuild로 TypeScript 지원해주려면 이것저것 설정이 좀 귀찮은데, 이걸 괜찮게 해주는 tsup이라는 라이브러리가 있습니다.

이번에는 이걸 활용해보겠습니다.

저번에 설치했던 ESBuild를 삭제하고 tsup을 설치해줍니다.

```terminal
npm uninstall esbuild
```

```terminal
npm install tsup typescript -D
```

```
tsup src/index.ts src/cli.ts
```

```json
{
  "name": "tomato-spoon",
  "version": "1.0.2",
  "description": "",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "scripts": {
    "deploy": "npm publish --access=public",
    "build": "npm run cjs:build && npm run esm:build",
    "cjs:build": "tsup index.ts --dts --format cjs",
    "esm:build": "tsup index.ts --format esm"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "tsup": "^8.4.0",
    "typescript": "^5.8.3"
  }
}
```

이렇게 변경하고 배포한다면, 끝이다.
