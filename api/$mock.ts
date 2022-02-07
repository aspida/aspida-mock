/* eslint-disable */
// prettier-ignore
import { AspidaClient } from 'aspida'
// prettier-ignore
import { MockClient, MockConfig, mockClient } from 'aspida-mock'
// prettier-ignore
import baseMiddleware from './@middleware'
// prettier-ignore
import api from './$api'
// prettier-ignore
import mock0 from './v2.0/index'
// prettier-ignore
import mock1 from './v1.1/users/_userId@string'
// prettier-ignore
import mock2 from './v1.1/_articleId.json'
// prettier-ignore
import mock3 from './v1.1/3.1'
// prettier-ignore
import mock4 from './v1.1/2/_hogeId@string/test-4/_fugaId'
// prettier-ignore
import mock5 from './v1.1'
// prettier-ignore
import mock6 from './index'
// prettier-ignore
import mock7 from './_sampleId@number.json'

// prettier-ignore
export const mockRoutes = () => [
  { path: '/v2.0', methods: mock0 },
  { path: '/v1.1/users/_userId@string', methods: mock1 },
  { path: '/v1.1/_articleId.json', methods: mock2 },
  { path: '/v1.1/3.1', methods: mock3 },
  { path: '/v1.1/2/_hogeId@string/test-4/_fugaId', methods: mock4 },
  { path: '/v1.1', methods: mock5 },
  { path: '', methods: mock6 },
  { path: '/_sampleId@number.json', methods: mock7 }
]

// prettier-ignore
export default <U>(client: AspidaClient<U> | MockClient<U>, config?: MockConfig) => {
  const middleware = [...baseMiddleware, ...(config?.middleware || [])]
  const mock = 'attachRoutes' in client ? client : mockClient(client)
  mock.attachRoutes(mockRoutes(), { ...config, middleware })

  return api(mock)
}
