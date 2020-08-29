import {
  AspidaClient,
  AspidaMethods,
  HttpMethod,
  dataToURLString,
  AspidaParams,
  RequestType
} from 'aspida'
import { MockMethods, MockResponse, PartialResponse } from './types'
import callMockHandler, { hasMockHandler } from './callMockHandler'
import { createValues } from './utils'

export const mockMethods = <T extends AspidaMethods>(methods: MockMethods<T>) => methods

export const printLog = (config: MockRequestConfig, status: number) => {
  const searchString = dataToURLString(config.query || {})

  console.log(
    `[mock] ${config.method}: ${config.path}${searchString ? `?${searchString}` : ''} => ${status}`
  )
}

export type MockRoute = {
  path: string
  methods: MockMethods<any>
}

export type MockClient<U> = AspidaClient<U> & {
  attachRoutes(routes: MockRoute[], config?: MockConfig): void
  detachRoutes(): void
}

export type MockRequestConfig = {
  path: string
  method: HttpMethod
  reqBody: any | undefined
  reqHeaders: any | undefined
  query: any | undefined
}

export type MockRequestConfigAndValues = MockRequestConfig & {
  values: ReturnType<typeof createValues>
}

export type MiddlewareHandler = (
  req: MockRequestConfigAndValues,
  res: (res?: PartialResponse) => void,
  next: (req?: MockRequestConfigAndValues) => void
) => void | Promise<void>

export const mockMiddleware = (middleware: MiddlewareHandler[]) => middleware

export type MockConfig = {
  log?: boolean
  delayMSec?: number
  middleware?: MiddlewareHandler[]
}

export const mockClient = <T>(aspidaClient: AspidaClient<T>): MockClient<T> => {
  let mockRoutes: MockRoute[] = []
  let mockConfig: MockConfig | undefined

  return {
    baseURL: aspidaClient.baseURL,

    fetch(
      baseURL: string,
      url: string,
      method: HttpMethod,
      params?: AspidaParams<T>,
      type?: RequestType
    ) {
      if (!hasMockHandler(url, method, mockRoutes)) {
        return aspidaClient.fetch(baseURL, url, method, params, type)
      }

      const send = async () => {
        const customConfig: MockRequestConfig = {
          path: url ?? '',
          method,
          query: params?.query,
          reqBody: params?.body,
          reqHeaders: params?.headers
        }

        const result = (await callMockHandler(
          customConfig,
          mockRoutes,
          mockConfig?.middleware
        )) ?? { status: 404 }

        if (mockConfig?.log) printLog(customConfig, result.status)

        await new Promise(resolve => setTimeout(resolve, mockConfig?.delayMSec))

        const res = {
          status: result.status,
          body: result.resBody,
          headers: result.resHeaders
        } as any

        if (result.status >= 400) {
          const err = new Error(`Request failed with status code ${result.status}`)
          ;(err as any).response = res
          throw err
        }

        return res
      }

      return {
        send,
        json: send,
        text: send,
        arrayBuffer: send,
        blob: send,
        formData: send
      }
    },

    attachRoutes(routes: MockRoute[], config?: MockConfig) {
      mockRoutes = routes
      mockConfig = config
    },

    detachRoutes() {
      mockRoutes = []
      mockConfig = undefined
    }
  }
}

export { MockResponse, callMockHandler, hasMockHandler }
