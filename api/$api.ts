/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida'
import * as ApiTypes from './@types'
import { Methods as Methods0 } from '.'
import { Methods as Methods1 } from './_sampleId.json@number'
import { Methods as Methods2 } from './aspida-mock'
import { Methods as Methods3 } from './v1.1'
import { Methods as Methods4 } from './v1.1/2/_hogeId@HogeId/entries.json'
import { Methods as Methods5 } from './v1.1/2/_hogeId@HogeId/test-4'
import { Methods as Methods6 } from './v1.1/2/_hogeId@HogeId/test-4/_fugaId'
import { Methods as Methods7 } from './v1.1/2/_hogeId@HogeId/test-4/fuga aa'
import { Methods as Methods8 } from './v1.1/2/_hogeId@number'
import { Methods as Methods9 } from './v1.1/3.1'
import { Methods as Methods10 } from './v1.1/_articleId.json'
import { Methods as Methods11 } from './v1.1/users/_userId@User[\'id\']'
import { Methods as Methods12 } from './v2.0'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/aspida-mock'
  const PATH1 = '/v1.1'
  const PATH2 = '/v1.1/2'
  const PATH3 = '/entries.json'
  const PATH4 = '/test-4'
  const PATH5 = '/test-4/fuga aa'
  const PATH6 = '/v1.1/3.1'
  const PATH7 = '/v1.1/users'
  const PATH8 = '/v2.0'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    _sampleId_json: (val0: number) => {
      const prefix0 = `/${val0}.json`

      return {
        get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody']>(prefix, prefix0, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody']>(prefix, prefix0, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
    },
    aspida_mock: {
      get: (option?: { config?: T }) =>
        fetch<Methods2['get']['resBody']>(prefix, PATH0, GET, option).text(),
      $get: (option?: { config?: T }) =>
        fetch<Methods2['get']['resBody']>(prefix, PATH0, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    },
    v1_1: {
      $2: {
        _hogeId_0: (val1: ApiTypes.HogeId) => {
          const prefix1 = `${PATH2}/${val1}`

          return {
            entries_json: {
              get: (option?: { config?: T }) =>
                fetch<Methods4['get']['resBody']>(prefix, `${prefix1}${PATH3}`, GET, option).json(),
              $get: (option?: { config?: T }) =>
                fetch<Methods4['get']['resBody']>(prefix, `${prefix1}${PATH3}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix1}${PATH3}`
            },
            test_4: {
              _fugaId: (val2: number | string) => {
                const prefix2 = `${prefix1}${PATH4}/${val2}`

                return {
                  get: (option?: { query?: Methods6['get']['query'], config?: T }) =>
                    fetch<Methods6['get']['resBody']>(prefix, prefix2, GET, option).json(),
                  $get: (option?: { query?: Methods6['get']['query'], config?: T }) =>
                    fetch<Methods6['get']['resBody']>(prefix, prefix2, GET, option).json().then(r => r.body),
                  post: (option: { body?: Methods6['post']['reqBody'], query: Methods6['post']['query'], config?: T }) =>
                    fetch<Methods6['post']['resBody']>(prefix, prefix2, POST, option).json(),
                  $post: (option: { body?: Methods6['post']['reqBody'], query: Methods6['post']['query'], config?: T }) =>
                    fetch<Methods6['post']['resBody']>(prefix, prefix2, POST, option).json().then(r => r.body),
                  put: (option: { query: Methods6['put']['query'], config?: T }) =>
                    fetch<Methods6['put']['resBody']>(prefix, prefix2, PUT, option).json(),
                  $put: (option: { query: Methods6['put']['query'], config?: T }) =>
                    fetch<Methods6['put']['resBody']>(prefix, prefix2, PUT, option).json().then(r => r.body),
                  delete: (option: { query: Methods6['delete']['query'], config?: T }) =>
                    fetch<Methods6['delete']['resBody']>(prefix, prefix2, DELETE, option).json(),
                  $delete: (option: { query: Methods6['delete']['query'], config?: T }) =>
                    fetch<Methods6['delete']['resBody']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
                  $path: (option?: { method?: 'get'; query: Methods6['get']['query'] } | { method: 'post'; query: Methods6['post']['query'] } | { method: 'put'; query: Methods6['put']['query'] } | { method: 'delete'; query: Methods6['delete']['query'] }) =>
                    `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
                }
              },
              fuga_aa: {
                get: (option: { query: Methods7['get']['query'], config?: T }) =>
                  fetch<Methods7['get']['resBody']>(prefix, `${prefix1}${PATH5}`, GET, option).json(),
                $get: (option: { query: Methods7['get']['query'], config?: T }) =>
                  fetch<Methods7['get']['resBody']>(prefix, `${prefix1}${PATH5}`, GET, option).json().then(r => r.body),
                post: (option: { body?: Methods7['post']['reqBody'], query: Methods7['post']['query'], config?: T }) =>
                  fetch<Methods7['post']['resBody']>(prefix, `${prefix1}${PATH5}`, POST, option).json(),
                $post: (option: { body?: Methods7['post']['reqBody'], query: Methods7['post']['query'], config?: T }) =>
                  fetch<Methods7['post']['resBody']>(prefix, `${prefix1}${PATH5}`, POST, option).json().then(r => r.body),
                put: (option: { query: Methods7['put']['query'], config?: T }) =>
                  fetch<Methods7['put']['resBody']>(prefix, `${prefix1}${PATH5}`, PUT, option).json(),
                $put: (option: { query: Methods7['put']['query'], config?: T }) =>
                  fetch<Methods7['put']['resBody']>(prefix, `${prefix1}${PATH5}`, PUT, option).json().then(r => r.body),
                delete: (option: { body: Methods7['delete']['reqBody'], query: Methods7['delete']['query'], config?: T }) =>
                  fetch<Methods7['delete']['resBody']>(prefix, `${prefix1}${PATH5}`, DELETE, option).json(),
                $delete: (option: { body: Methods7['delete']['reqBody'], query: Methods7['delete']['query'], config?: T }) =>
                  fetch<Methods7['delete']['resBody']>(prefix, `${prefix1}${PATH5}`, DELETE, option).json().then(r => r.body),
                $path: (option?: { method?: 'get'; query: Methods7['get']['query'] } | { method: 'post'; query: Methods7['post']['query'] } | { method: 'put'; query: Methods7['put']['query'] } | { method: 'delete'; query: Methods7['delete']['query'] }) =>
                  `${prefix}${prefix1}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
              },
              get: (option: { query: Methods5['get']['query'], config?: T }) =>
                fetch(prefix, `${prefix1}${PATH4}`, GET, option).send(),
              $get: (option: { query: Methods5['get']['query'], config?: T }) =>
                fetch(prefix, `${prefix1}${PATH4}`, GET, option).send().then(r => r.body),
              post: (option?: { body?: Methods5['post']['reqBody'], query?: Methods5['post']['query'], config?: T }) =>
                fetch(prefix, `${prefix1}${PATH4}`, POST, option).send(),
              $post: (option?: { body?: Methods5['post']['reqBody'], query?: Methods5['post']['query'], config?: T }) =>
                fetch(prefix, `${prefix1}${PATH4}`, POST, option).send().then(r => r.body),
              put: (option?: { query?: Methods5['put']['query'], config?: T }) =>
                fetch<Methods5['put']['resBody']>(prefix, `${prefix1}${PATH4}`, PUT, option).json(),
              $put: (option?: { query?: Methods5['put']['query'], config?: T }) =>
                fetch<Methods5['put']['resBody']>(prefix, `${prefix1}${PATH4}`, PUT, option).json().then(r => r.body),
              delete: (option: { query: Methods5['delete']['query'], config?: T }) =>
                fetch<Methods5['delete']['resBody']>(prefix, `${prefix1}${PATH4}`, DELETE, option).json(),
              $delete: (option: { query: Methods5['delete']['query'], config?: T }) =>
                fetch<Methods5['delete']['resBody']>(prefix, `${prefix1}${PATH4}`, DELETE, option).json().then(r => r.body),
              $path: (option?: { method?: 'get'; query: Methods5['get']['query'] } | { method: 'post'; query: Methods5['post']['query'] } | { method: 'put'; query: Methods5['put']['query'] } | { method: 'delete'; query: Methods5['delete']['query'] }) =>
                `${prefix}${prefix1}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            }
          }
        },
        _hogeId_1: (val3: number) => {
          const prefix3 = `${PATH2}/${val3}`

          return {
            get: (option: { query?: Methods8['get']['query'], headers: Methods8['get']['reqHeaders'], config?: T }) =>
              fetch<Methods8['get']['resBody']>(prefix, prefix3, GET, option).json(),
            $get: (option: { query?: Methods8['get']['query'], headers: Methods8['get']['reqHeaders'], config?: T }) =>
              fetch<Methods8['get']['resBody']>(prefix, prefix3, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get'; query: Methods8['get']['query'] }) =>
              `${prefix}${prefix3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        }
      },
      $3_1: {
        get: (option: { query?: Methods9['get']['query'], headers: Methods9['get']['reqHeaders'], config?: T }) =>
          fetch<Methods9['get']['resBody']>(prefix, PATH6, GET, option).json(),
        $get: (option: { query?: Methods9['get']['query'], headers: Methods9['get']['reqHeaders'], config?: T }) =>
          fetch<Methods9['get']['resBody']>(prefix, PATH6, GET, option).json().then(r => r.body),
        post: (option: { body?: Methods9['post']['reqBody'], query: Methods9['post']['query'], config?: T }) =>
          fetch<Methods9['post']['resBody']>(prefix, PATH6, POST, option, 'URLSearchParams').json(),
        $post: (option: { body?: Methods9['post']['reqBody'], query: Methods9['post']['query'], config?: T }) =>
          fetch<Methods9['post']['resBody']>(prefix, PATH6, POST, option, 'URLSearchParams').json().then(r => r.body),
        $path: (option?: { method?: 'get'; query: Methods9['get']['query'] } | { method: 'post'; query: Methods9['post']['query'] }) =>
          `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      _articleId_json: (val4: number | string) => {
        const prefix4 = `${PATH1}/${val4}.json`

        return {
          get: (option?: { config?: T }) =>
            fetch<Methods10['get']['resBody']>(prefix, prefix4, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<Methods10['get']['resBody']>(prefix, prefix4, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix4}`
        }
      },
      users: {
        _userId: (val5: ApiTypes.User['id']) => {
          const prefix5 = `${PATH7}/${val5}`

          return {
            get: (option: { query: Methods11['get']['query'], headers: Methods11['get']['reqHeaders'], config?: T }) =>
              fetch<Methods11['get']['resBody']>(prefix, prefix5, GET, option).json(),
            $get: (option: { query: Methods11['get']['query'], headers: Methods11['get']['reqHeaders'], config?: T }) =>
              fetch<Methods11['get']['resBody']>(prefix, prefix5, GET, option).json().then(r => r.body),
            post: (option: { query: Methods11['post']['query'], config?: T }) =>
              fetch<Methods11['post']['resBody']>(prefix, prefix5, POST, option).json(),
            $post: (option: { query: Methods11['post']['query'], config?: T }) =>
              fetch<Methods11['post']['resBody']>(prefix, prefix5, POST, option).json().then(r => r.body),
            $path: (option?: { method?: 'get'; query: Methods11['get']['query'] } | { method: 'post'; query: Methods11['post']['query'] }) =>
              `${prefix}${prefix5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        }
      },
      get: (option?: { query?: Methods3['get']['query'], config?: T }) =>
        fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH1, GET, option).json(),
      $get: (option?: { query?: Methods3['get']['query'], config?: T }) =>
        fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods3['get']['query'] }) =>
        `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    v2_0: {
      get: (option: { query: Methods12['get']['query'], headers: Methods12['get']['reqHeaders'], config?: T }) =>
        fetch<Methods12['get']['resBody'], Methods12['get']['resHeaders'], Methods12['get']['status']>(prefix, PATH8, GET, option).text(),
      $get: (option: { query: Methods12['get']['query'], headers: Methods12['get']['reqHeaders'], config?: T }) =>
        fetch<Methods12['get']['resBody'], Methods12['get']['resHeaders'], Methods12['get']['status']>(prefix, PATH8, GET, option).text().then(r => r.body),
      $path: (option?: { method?: 'get'; query: Methods12['get']['query'] }) =>
        `${prefix}${PATH8}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    get: (option?: { query?: Methods0['get']['query'], headers?: Methods0['get']['reqHeaders'], config?: T }) =>
      fetch<Methods0['get']['resBody']>(prefix, '', GET, option).formData(),
    $get: (option?: { query?: Methods0['get']['query'], headers?: Methods0['get']['reqHeaders'], config?: T }) =>
      fetch<Methods0['get']['resBody']>(prefix, '', GET, option).formData().then(r => r.body),
    post: (option: { body: Methods0['post']['reqBody'], query: Methods0['post']['query'], headers?: Methods0['post']['reqHeaders'], config?: T }) =>
      fetch<Methods0['post']['resBody']>(prefix, '', POST, option).arrayBuffer(),
    $post: (option: { body: Methods0['post']['reqBody'], query: Methods0['post']['query'], headers?: Methods0['post']['reqHeaders'], config?: T }) =>
      fetch<Methods0['post']['resBody']>(prefix, '', POST, option).arrayBuffer().then(r => r.body),
    put: (option: { query: Methods0['put']['query'], config?: T }) =>
      fetch<Methods0['put']['resBody'], Methods0['put']['resHeaders'], Methods0['put']['status']>(prefix, '', PUT, option).json(),
    $put: (option: { query: Methods0['put']['query'], config?: T }) =>
      fetch<Methods0['put']['resBody'], Methods0['put']['resHeaders'], Methods0['put']['status']>(prefix, '', PUT, option).json().then(r => r.body),
    delete: (option: { query: Methods0['delete']['query'], config?: T }) =>
      fetch<void, Methods0['delete']['resHeaders'], Methods0['delete']['status']>(prefix, '', DELETE, option).send(),
    $delete: (option: { query: Methods0['delete']['query'], config?: T }) =>
      fetch<void, Methods0['delete']['resHeaders'], Methods0['delete']['status']>(prefix, '', DELETE, option).send().then(r => r.body),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] } | { method: 'post'; query: Methods0['post']['query'] } | { method: 'put'; query: Methods0['put']['query'] } | { method: 'delete'; query: Methods0['delete']['query'] }) =>
      `${prefix}${''}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
