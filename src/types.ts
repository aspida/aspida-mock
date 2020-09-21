import { HttpMethod, HttpStatusOk, AspidaMethods, AspidaMethodParams } from 'aspida'

type RequestParams<T extends AspidaMethodParams> = {
  path: string
  method: HttpMethod
  values: Record<string, string | number>
} & Pick<T, 'query' | 'reqBody' | 'reqHeaders'>

type HttpStatusNoOk =
  | 301
  | 302
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 409
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505

type PartiallyPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type BaseResponse<T, U, V> = {
  status: V extends number ? V : HttpStatusOk
  resBody: T
  resHeaders: U
}

export type PartialResponse = PartiallyPartial<
  BaseResponse<any, any, HttpStatusOk | HttpStatusNoOk>,
  'resBody' | 'resHeaders'
>

export type MockResponse<K extends AspidaMethodParams = {}> =
  | (K extends { resBody: K['resBody']; resHeaders: K['resHeaders'] }
      ? BaseResponse<K['resBody'], K['resHeaders'], K['status']>
      : K extends { resBody: K['resBody'] }
      ? PartiallyPartial<BaseResponse<K['resBody'], K['resHeaders'], K['status']>, 'resHeaders'>
      : K extends { resHeaders: K['resHeaders'] }
      ? PartiallyPartial<BaseResponse<K['resBody'], K['resHeaders'], K['status']>, 'resBody'>
      : PartiallyPartial<
          BaseResponse<K['resBody'], K['resHeaders'], K['status']>,
          'resBody' | 'resHeaders'
        >)
  | PartiallyPartial<BaseResponse<any, any, HttpStatusNoOk>, 'resBody' | 'resHeaders'>

export type MockMethods<T extends AspidaMethods> = {
  [K in keyof T]?: (req: RequestParams<T[K]>) => MockResponse<T[K]> | Promise<MockResponse<T[K]>>
}
