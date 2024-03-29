# aspida-mock

<br />
<br />
<br />
<br />
<img src="https://aspida.github.io/aspida/logos/svg/black.svg" alt="aspida" title="aspida" width="1000" height="120" />
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

## Features

- API mock dedicated to TypeScript using the type definition of [aspida](https://github.com/aspida/aspida).
- Supports all HTTP methods such as `GET`/`POST`/`PUT`/`DELETE` in a few lines.
- No server required, works only with browser.

## Usage

### Installation

- Using [npm](https://www.npmjs.com/):

  ```sh
  $ npm install aspida-mock @aspida/axios axios
  # $ npm install aspida-mock @aspida/fetch
  # $ npm install aspida-mock @aspida/node-fetch node-fetch
  # $ npm install aspida-mock @aspida/ky ky
  ```

- Using [Yarn](https://yarnpkg.com/):

  ```sh
  $ yarn add aspida-mock @aspida/axios axios
  # $ yarn add aspida-mock @aspida/fetch
  # $ yarn add aspida-mock @aspida/node-fetch node-fetch
  # $ yarn add aspida-mock @aspida/ky ky
  ```

### Creating API endpoints

Export mockMethods in aspida type definition file.

`api/users/index.ts`

```ts
import { mockMethods } from "aspida-mock";

export type Methods = {
  post: {
    query: { id: number };
    reqHeaders: { val: string };
    reqBody: { name: string };
    resHeaders: { token: string };
    resBody: {
      id: number;
      name: string;
    };
  };
};

export default mockMethods<Methods>({
  post: ({ query, reqHeaders, reqBody }) => ({
    status: 200,
    resHeaders: { token: reqHeaders.val },
    resBody: {
      id: query.id,
      name: reqBody.name,
    },
  }),
});
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

```ts
import aspidaClient from "@aspida/axios"; // "@aspida/fetch", "@aspida/node-fetch", "@aspida/ky"
import api from "./api/$api";
import mock from "./api/$mock";

const client = process.env.NODE_ENV === "development" ? mock(aspidaClient()) : api(aspidaClient());

(async () => {
  const res = await client.users.post({
    query: { id: 0 },
    headers: { val: "hoge" },
    data: { name: "fuga" },
  });

  console.log(res);
  /*
  {
    status: 200,
    headers: { token: "hoge" },
    data: { id: 0, name: "fuga" }
  }
  */
})();
```

### Middleware

For every request, you can insert processing before reaching mockMethods.

`api/@middleware.ts`

```ts
import { mockMiddleware } from "aspida-mock";

export default mockMiddleware([
  (req, _res, next) => {
    next({ ...req, query: { hoge: req.query.hoge + 1 } });
  },
  (req, res) => {
    res({ status: 200, resBody: { fuga: req.query.hoge + 2 } });
  },
]);
```

`api/users/index.ts`

```ts
import { mockMethods } from "aspida-mock";

export type Methods = {
  get: {
    query: { hoge: number };
    resBody: {
      fuga: number;
    };
  };
};

export default mockMethods<Methods>({
  get: ({ query }) => ({
    status: 200,
    resBody: { fuga: query.hoge + 4 },
  }),
});
```

`index.ts`

```ts
import aspidaClient from "@aspida/axios"; // "@aspida/fetch", "@aspida/node-fetch", "@aspida/ky"
import mock from "./api/$mock";

const client = mock(aspidaClient());

(async () => {
  const res = await client.users.get({
    query: { hoge: 0 },
  });

  console.log(res);
  /*
  {
    status: 200,
    data: { fuga: 3 }
  }
  */
})();
```

### Options

aspida-mock has several options available.

#### `delayMSec: number`

Simulate response delay.

```ts
import aspidaClient from "@aspida/axios"; // "@aspida/fetch", "@aspida/node-fetch", "@aspida/ky"
import mock from "./api/$mock";

const client = mock(aspidaClient(), { delayMSec: 500 });

(async () => {
  console.time();
  await client.users.$get();
  console.timeEnd(); // default: 506.590ms
})();
```

#### `log: boolean`

Switch request log output.

```ts
import aspidaClient from "@aspida/axios"; // "@aspida/fetch", "@aspida/node-fetch", "@aspida/ky"
import mock from "./api/$mock";

const client = mock(aspidaClient(), { log: true });

(async () => {
  await client.users.$get({ query: { bar: "baz" } });
  // [mock] get: /users?bar=baz => 200
})();
```

### Cautions

#### `.gitignore`

Exclude `$mock.ts` generated by aspida-mock in the build from [Git](https://git-scm.com/) monitoring.

```sh
$ echo "\$mock.ts" >> .gitignore

# If Windows (Command Prompt)
> echo $mock.ts >> .gitignore
```

## Command Line Interface Options

The following options can be specified in the Command Line Interface.

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
      <td>Specify the path to the configuration file.</td>
    </tr>
    <tr>
      <td nowrap><code>--watch</code><br /><code>-w</code></td>
      <td></td>
      <td></td>
      <td>
        Enable watch mode.<br />
        Regenerate <code>$mock.ts</code> according to
        the increase / decrease of the API endpoint file.
      </td>
    </tr>
    <tr>
      <td nowrap><code>--version</code><br /><code>-v</code></td>
      <td></td>
      <td></td>
      <td>Print aspida-mock version.</td>
    </tr>
  </tbody>
</table>

## Configuration

aspida-mock refers to only "input" among the items of the aspida configuration file `aspida.config.js`.  
This allows you to always generate a mock from the same directory as aspida.  
[Options of aspida.config.js](https://github.com/aspida/aspida#options-of-aspidaconfigjs)

## License

aspida-mock is licensed under a [MIT License](https://github.com/aspida/aspida-mock/blob/master/LICENSE).
