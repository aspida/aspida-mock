const createImportPath = (filePath: string, inputDir: string) =>
  filePath
    .replace(new RegExp(`^(.\\/)?${inputDir.replace(/^.\//, '').replace(/\/$/, '')}`), '')
    .replace(/'/g, "\\'")
    .replace(/\.ts$/, '')

const createCondition = (
  filePath: string,
  inputDir: string,
  methods: string,
  trailingSlash: boolean
) => `
  { path: '${createImportPath(filePath, inputDir).replace(/(\/index)$/, '') || ''}${
  trailingSlash ? '/' : ''
}', methods: ${methods} }`

export default (
  inputDir: string,
  trailingSlash: boolean,
  hasMiddleware: boolean,
  pathList: string[]
) =>
  `/* eslint-disable */
import { AspidaClient } from 'aspida'
import { MockClient, MockConfig, mockClient } from 'aspida-mock'
${hasMiddleware ? "import baseMiddleware from './@middleware'\n" : ''}import api from './$api'
${pathList
  .map((filePath, i) => `import mock${i} from '.${createImportPath(filePath, inputDir)}'\n`)
  .join('')}
export const mockRoutes = () => [${pathList
    .map((filePath, i) => createCondition(filePath, inputDir, `mock${i}`, trailingSlash))
    .join(',')}
]

export default <U>(client: AspidaClient<U> | MockClient<U>, config?: MockConfig) => {${
    hasMiddleware ? '\n  const middleware = [...baseMiddleware, ...(config?.middleware || [])]' : ''
  }
  const mock = 'attachRoutes' in client ? client : mockClient(client)
  mock.attachRoutes(mockRoutes(), ${hasMiddleware ? '{ ...config, middleware }' : 'config'})

  return api(mock)
}\n`
