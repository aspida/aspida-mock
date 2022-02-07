import fs from 'fs'
import { version } from '../../package.json'
import { run } from '../../src/cli'
import build from '../../src/cli/buildRouteFile'

describe('cli', () => {
  test('version command', () => {
    const spyLog = jest.spyOn(console, 'log').mockImplementation(x => x)
    const args = ['--version']

    run(args)
    expect(console.log).toHaveBeenCalledWith(`v${version}`)

    spyLog.mockReset()
    spyLog.mockRestore()
  })

  test('snapshot', () => {
    const configs = [
      {
        input: 'api',
        resultDirPath: 'api'
      },
      {
        input: './api',
        resultDirPath: 'api'
      },
      {
        input: 'api/',
        resultDirPath: 'api'
      }
    ]

    configs.forEach(config => {
      const resultFilePath = `${config.resultDirPath}/$mock.ts`
      const result = fs.readFileSync(resultFilePath, 'utf8')
      const { text, filePath } = build({
        input: config.input,
        baseURL: '',
        outputMode: 'all',
        trailingSlash: false,
        outputEachDir: false
      })

      expect(text).toBe(result.replace(/\r/g, ''))
      expect(filePath).toBe(resultFilePath)
    })
  })
})
