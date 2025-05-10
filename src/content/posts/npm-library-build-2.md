---
title: "(2장) 배포한 NPM 라이브러리를 가져올 수 없다?!"
date: "2024-05-10"
---

<a href="./npm-library-build">저번 포스팅</a>에서 NPM 라이브러리를 배포했습니다.

그래서 install 명령어를 통해 만든 소스코드를 어디서든 사용할 수 있게되었습니다.

```bash
npm install tomato-spoon@1.0.0
```

하지만 이 NPM Package를 사용한다면 문제가 하나 발생할겁니다.

```terminal
SyntaxError: Unexpected token 'export'
```

(에러 메시지는 환경에 따라 달라질 수 있습니다.)

에러가 발생한 이유는 Module Resolution (ESM, CJS) 방식이 일치하지 않기 때문입니다.

이게 무슨 말인지 이해하기 위해 HTML, CSS, JavaScript만을 다루던 시절로 내려가보겠습니다.

HTML, JavaScript 파일을 생성한 뒤에 Script 태그를 통해 두 파일을 연결시켜주세요.

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <script src="script.js"></script>
  </body>
</html>
```

```javascript:script.js
console.log("inject script!");
```

이 HTML 파일을 브라우저에서 실행하면 아래와 같은 결과 화면을 확인할 수 있습니다.

<img src="/images/2.png" alt="NPM 화면" />

하지만 모든 코드를 하나의 파일에 작성하게 되면 유지보수가 어렵고 불편해집니다. 그래서 기능별로 파일을 분리하는 것이 좋습니다.

예를 들어, getRandomNumber 함수를 별도의 파일로 분리한 뒤, 다음과 같이 불러올 수 있습니다:

```javascript:script.js
import { getRandomNumber } from "./random.js";

console.log("inject script!");
console.log(getRandomNumber());
```

```javascript:random.js
export const getRandomNumber = () => {
    return Math.random();
}
```

하지만, 이 상태에서 브라우저에서 실행시킨다면 에러를 마주하게 됩니다.

```terminal
Uncaught SyntaxError: Cannot use import statement outside a module (at script.js:1:1)
```

이 에러가 발생한 이유를 이해하려면, 우리가 import를 사용하기 전 시절로 잠시 돌아가 볼 필요가 있습니다.

현재처럼 import / export를 이용해 모듈을 관리하는 방식을 **ESM (ECMAScript Modules)** 이라고 부릅니다.

반면, 과거에는 require와 module.exports를 사용해 모듈을 불러왔는데요, 이 방식을 **CJS (CommonJS)** 라고 합니다.

ESM이 도입된 이후에도 기존 CJS 방식과의 하위 호환을 유지하기 위해, 브라우저에서 `<script>` 태그를 사용할 경우 기본적으로 CJS 스타일을 따르게 되어 있습니다.

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <!-- 이 javascript 파일은 cjs입니다. -->
    <script src="script.js"></script>
  </body>
</html>
```

그래서 문제가 발생한 이유는, 브라우저에게 이 JavaScript 파일이 CJS 방식이라고 암묵적으로 전달되었지만, 실제로는 import / export 같은 ESM 문법을 사용했기 때문입니다. 이로 인해 충돌이 발생한 것이죠.

게다가 요즘 대부분의 최신 브라우저는 ESM을 기본으로 지원하기 때문에, 반대로 require()를 사용해도 에러가 발생합니다.

즉, 브라우저가 이 스크립트가 ESM 문법을 사용하고 있다는 사실을 명확히 알 수 있도록 설정해줘야 합니다.

이를 위해 `<script>` 태그에 type="module" 속성을 추가해줍니다:

```html
<script src="script.js" type="module"></script>
```

이렇게 하면 브라우저는 해당 스크립트를 ESM으로 해석하고, import / export 문법을 제대로 처리할 수 있게 됩니다.

<img src="/images/3.png" alt="NPM 화면" />

이렇게 변경해준다면 저희는 원하는 결과물을 받아볼 수 있습니다.

다시 NPM 이슈로 돌아가겠습니다. `package.json`은 script 태그와 같은 역할을 합니다.

그래서 ESM 문법으로 코드를 작성했다면 type="module"을 명시해줘야 사용할 수 있습니다.

```json
{
  "name": "tomato-spoon",
  "version": "1.0.1",
  "type": "module",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

이렇게 수정한 뒤 다시 publish하면, 처음에 발생했던 에러는 더 이상 나타나지 않을 것입니다.

하지만 ESM만 지원하는 것이 무조건 좋은 방향이라고는 할 수 없습니다.

라이브러리는 다양한 환경에서 사용될 가능성이 높기 때문에, 가능하다면 ESM과 CJS를 모두 지원하는 것이 더 바람직합니다.

이를 Dual Package라고 하는데, [Toss Tech Blog](https://toss.tech/article/commonjs-esm-exports-field)에서도 한 번 다룬 적이 있네요.

다음 글에서는 ESM / CJS 두 가지 환경을 모두 지원해주는 NPM Module을 만드는 방법에 대해서 다뤄보겠습니다.

## 마무리

처음 이 에러를 마주했을 때는 꽤 당황스러웠던 기억이 납니다.

import를 써도 안 되고, require를 써도 모듈을 불러올 수 없다는 에러가 계속 떴거든요.

하지만 과거에 stack overflow에서 해결책을 본 뒤에 type="module"을 붙여서 해결했던 기억이 났습니다. ㅠ-ㅠ

그때 제대로 이해하지 않고 그냥 넘어갔던 게, 오히려 더 많은 시간을 낭비하게 만든 원인이었던 것 같아요.

잠깐만 개념을 확실히 짚고 갔더라면 훨씬 빨리 해결할 수 있었을 텐데 말이죠.

저와 같은 상황을 겪고 계신 분들이라면, 이 내용을 정확히 이해하고 많은 시간을 아끼셨으면 좋겠습니다!
