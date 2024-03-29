import type { AspidaClient } from 'aspida';
import type { MockClient, MockConfig } from 'aspida-mock';
import { mockClient } from 'aspida-mock';
import baseMiddleware from './@middleware';
import api from './$api';
import mock0 from './v2.0/index';
import mock1 from './v1.1/users/_userId@string';
import mock2 from './v1.1/_articleId.json';
import mock3 from './v1.1/3.1';
import mock4 from './v1.1/2/_hogeId@string/test-4/_fugaId';
import mock5 from './v1.1';
import mock6 from './index';
import mock7 from './_sampleId@number.json';

export const mockRoutes = () => [
  { path: '/v2.0', methods: mock0 },
  { path: '/v1.1/users/_userId@string', methods: mock1 },
  { path: '/v1.1/_articleId.json', methods: mock2 },
  { path: '/v1.1/3.1', methods: mock3 },
  { path: '/v1.1/2/_hogeId@string/test-4/_fugaId', methods: mock4 },
  { path: '/v1.1', methods: mock5 },
  { path: '', methods: mock6 },
  { path: '/_sampleId@number.json', methods: mock7 },
];

export default <U>(client: AspidaClient<U> | MockClient<U>, config?: MockConfig | undefined) => {
  const middleware = [...baseMiddleware, ...(config?.middleware || [])];
  const mock = 'attachRoutes' in client ? client : mockClient(client);
  mock.attachRoutes(mockRoutes(), { ...config, middleware });

  return api(mock);
};
