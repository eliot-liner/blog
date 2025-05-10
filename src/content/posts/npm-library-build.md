---
title: "(1장) NPM에 JavaScript 코드 배포하기"
date: "2024-05-10"
---

## NPM이란

JavaScript로 프론트엔드나 백엔드 개발을 하다 보면, 자주 쓰는 기능이나 유틸리티 함수들을 매번 프로젝트에 복사해서 사용하는 일이 많습니다.

이런 반복을 줄이고, 재사용 가능한 코드를 좀 더 효율적으로 관리할 수 있는 방법이 바로 **NPM(Node Package Manager)** 입니다.

쉽게 말해, 저희는 직접 만든 JavaScript 코드를 NPM에 올려두고, 필요한 프로젝트에서 패키지처럼 설치해서 사용할 수 있습니다.

## NPM Server에 패키지 배포하기

이번에는 간단한 JavaScript 모듈을 만들어 실제로 NPM에 배포해보겠습니다.

먼저 package.json 파일이 필요합니다. 터미널에서 다음 명령어를 입력해 초기 설정을 진행해 주세요:

```bash
npm init
```

각 항목을 입력하라는 메시지가 나오는데, 저는 패키지 이름만 입력하고 나머지는 그냥 Enter 키로 넘어갔습니다. 필요한 부분은 추후에 수정해도 괜찮습니다.

성공적으로 마치면 아래와 같은 결과물을 얻게 됩니다:

```json
{
  "name": "tomato-spoon",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

그리고 `index.js`파일을 만든 뒤에 필요한 코드를 작성해주세요.

```javascript
export function getName() {
  return "tomato-spoon";
}
```

자, 이제 필요한 준비는 모두 끝났습니다. 이제 진짜 배포를 해보겠습니다.

먼저 터미널에서 NPM에 로그인해주세요.

```bash
npm login
```

로그인이 완료되었다면, 이제 패키지를 배포할 차례입니다.

> **(TMI)**

만약 패키지 이름에 네임스페이스(예: `@company/your-package`)를 사용했다면, 기본적으로 이 패키지는 private(비공개) 상태로 배포됩니다. NPM에서 private 패키지는 유료 기능이기 때문에, 우리는 공개(public) 패키지로 명시적으로 배포해야 합니다.

그래서 다음과 같이 --access=public 옵션을 추가해줍니다:

```bash
npm publish --access=public
```

```terminal
(base) josanghyeon@josanghyeon-ui-MacBookPro npm % npm publish --access=public
npm notice
npm notice 📦  tomato-spoon@1.0.0
npm notice === Tarball Contents ===
npm notice 5B   README.md
npm notice 55B  index.js
npm notice 208B package.json
npm notice === Tarball Details ===
npm notice name:          tomato-spoon
npm notice version:       1.0.0
npm notice filename:      tomato-spoon-1.0.0.tgz
npm notice package size:  328 B
npm notice unpacked size: 268 B
npm notice shasum:        f22af6cfd5a8368e711f9ead472abc5d3b066829
npm notice integrity:     sha512-O0NwxZDRaW+7V[...]ROBn6Tp0rfIgg==
npm notice total files:   3
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
+ tomato-spoon@1.0.0
```

<img src="/images/1.png" alt="NPM 화면" />

자, 이제 이 명령어 하나만 입력하면 방금 배포한 소스코드를 어디서든 설치해서 사용할 수 있습니다:

```bash
npm install tomato-spoon@1.0.0
```

[Source Code 링크](https://github.com/eliot-liner/npm/tree/8d9a247584ff0526fe6e1237d1b7ead1d72ef640)

[NPM 링크](https://www.npmjs.com/package/tomato-spoon)
