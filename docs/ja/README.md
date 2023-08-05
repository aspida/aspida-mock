# aspida-mock

<br />
<br />
<br />
<div align="center">
  <img src="https://aspida.github.io/aspida/logos/svg/black.svg" alt="aspida" title="aspida" width="600" />
</div>
<br />
<br />
<br />
<div align="center">
  <a href="https://www.npmjs.com/package/aspida-mock">
    <img src="https://img.shields.io/npm/v/aspida-mock" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/aspida-mock">
    <img src="https://img.shields.io/npm/dm/aspida-mock" alt="npm download" />
  </a>
</div>
<br />
<p align="center">TypeScript friendly RESTful API mock for aspida.</p>
<div align="center">
  <a href="https://github.com/aspida/aspida-mock#readme">🇺🇸English</a> |
  <a href="https://github.com/aspida/aspida-mock/tree/master/docs/ja#readme">🇯🇵日本語</a>
</div>
<br />
<br />

## 特徴

- [aspida](https://github.com/aspida/aspida)の型定義を利用する TypeScript 専用 API モック
- `GET`/`POST`/`PUT`/`DELETE` など全ての HTTP メソッドに数行で対応
- サーバー不要、ブラウザのみで動作

## 使い方

### インストール

- [npm](https://www.npmjs.com/) を使ってインストール:

  ```sh
  $ npm install aspida-mock @aspida/axios axios
  # $ npm install aspida-mock @aspida/fetch
  # $ npm install aspida-mock @aspida/node-fetch node-fetch
  # $ npm install aspida-mock @aspida/ky ky
  ```

- [Yarn](https://yarnpkg.com/) を使ってインストール:

  ```sh
  $ yarn add aspida-mock @aspida/axios axios
  # $ yarn add aspida-mock @aspida/fetch
  # $ yarn add aspida-mock @aspida/node-fetch node-fetch
  # $ yarn add aspida-mock @aspida/ky ky
  ```

### API エンドポイントの作成

aspida の型定義ファイルで mockMethods を export する

`apis/users/index.ts`

<!-- prettier-ignore -->
```ts
import { mockMethods } from "aspida-mock"

export type Methods = {
  post: {
    query: { id: number }
    reqHeaders: { val: string }
    reqBody: { name: string }
    resHeaders: { token: string }
    resBody: {
      id: number
      name: string
    }
  }
}

export default mockMethods<Methods>({
  post: ({ query, reqHeaders, reqBody }) => ({
    status: 200,
    resHeaders: { token: reqHeaders.val },
    resBody: {
      id: query.id,
      name: reqBody.name
    }
  })
})
```

`package.json`

```json
{
  "scripts": {
    "build": "aspida && aspida-mock"
  }
}
```

`tarminal`

```sh
$ npm run build
```

`index.ts`

<!-- prettier-ignore -->
```ts
import aspidaClient from "@aspida/axios" // "@aspida/fetch", "@aspida/node-fetch", "@aspida/ky"
import api from "./api/$api"
import mock from "./api/$mock"

const client = process.env.NODE_ENV === "development"
  ? mock(aspidaClient())
  : api(aspidaClient())

;(async () => {
  const res = await client.users.post({
    query: { id: 0 },
    headers: { val: "hoge" },
    data: { name: "fuga" }
  })

  console.log(res)
  /*
  {
    status: 200,
    headers: { token: "hoge" },
    data: { id: 0, name: "fuga" }
  }
  */
})()
```

### ミドルウェア

全てのリクエストについて、mockMethods に到達する前に処理を挿入することができます。

`api/@middleware.ts`

```ts
import { mockMiddleware } from "aspida-mock"

export default mockMiddleware([
  (req, _res, next) => {
    next({ ...req, query: { hoge: req.query.hoge + 1 } })
  },
  (req, res) => {
    res({ status: 200, resBody: { fuga: req.query.hoge + 2 } })
  }
])
```

`api/users/index.ts`

<!-- prettier-ignore -->
```ts
import { mockMethods } from "aspida-mock"

export type Methods = {
  get: {
    query: { hoge: number }
    resBody: {
      fuga: number
    }
  }
}

export default mockMethods<Methods>({
  get: ({ query }) => ({
    status: 200,
    resBody: { fuga: query.hoge + 4 }
  })
})
```

`index.ts`

<!-- prettier-ignore -->
```ts
import aspidaClient from "@aspida/axios" // "@aspida/fetch", "@aspida/node-fetch", "@aspida/ky"
import mock from "./api/$mock"

const client = mock(aspidaClient())

;(async () => {
  const res = await client.users.get({
    query: { hoge: 0 }
  })

  console.log(res)
  /*
  {
    status: 200,
    data: { fuga: 3 }
  }
  */
})()
```

### オプション

aspida-mock ではいくつかのオプションを利用することができます。

#### `delayMSec: number`

レスポンスの遅延をシミュレートします。

<!-- prettier-ignore -->
```ts
import aspidaClient from "@aspida/axios" // "@aspida/fetch", "@aspida/node-fetch", "@aspida/ky"
import mock from "./api/$mock"

const client = mock(aspidaClient(), { delayMSec: 500 })

;(async () => {
  console.time()
  await client.users.$get()
  console.timeEnd() // default: 506.590ms
})()
```

#### `log: boolean`

リクエストログの出力を切り替えます。

<!-- prettier-ignore -->
```ts
import aspidaClient from "@aspida/axios" // "@aspida/fetch", "@aspida/node-fetch", "@aspida/ky"
import mock from "./api/$mock"

const client = mock(aspidaClient(), { log: true })

;(async () => {
  await client.users.$get({ query: { bar: "baz" }})
  // [mock] get: /users?bar=baz => 200
})()
```

### 注意事項

#### `.gitignore`

aspida-mock がビルドで生成する `$mock.ts` を [Git](https://git-scm.com/) の監視から除外してください。

```sh
$ echo "\$mock.ts" >> .gitignore

# If Windows (Command Prompt)
> echo $mock.ts >> .gitignore
```

## Command Line Interface のオプション

Command Line Interface では以下のオプションを指定することができます。

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Default</th>
      <th width="100%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td nowrap><code>--config</code><br /><code>-c</code></td>
      <td><code>string</code></td>
      <td><code>"aspida.config.js"</code></td>
      <td>設定ファイルまでのパスを指定します。</td>
    </tr>
    <tr>
      <td nowrap><code>--watch</code><br /><code>-w</code></td>
      <td></td>
      <td></td>
      <td>
        監視モードを有効にします。<br />
        API のエンドポイントとなるファイルの増減に合わせて
        <code>$mock.ts</code> を再生成します。
      </td>
    </tr>
    <tr>
      <td nowrap><code>--version</code><br /><code>-v</code></td>
      <td></td>
      <td></td>
      <td>aspida-mock のバージョンを表示します。</td>
    </tr>
  </tbody>
</table>

## 設定

aspida-mock は aspida の設定ファイル `aspida.config.js` の項目のうち、「input」のみを参照します。  
これにより、常に aspida と同じディレクトリからモックを生成できます。  
[aspida.config.js のオプション](https://github.com/aspida/aspida/tree/master/packages/aspida/docs/ja#aspidaconfigjs-%E3%81%AE%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3)

## License

aspida-mock is licensed under a [MIT License](https://github.com/aspida/aspida-mock/blob/master/LICENSE).
