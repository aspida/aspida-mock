import { HttpMethod, HttpStatusOk, AspidaMethods, AspidaMethodParams } from 'aspida';
declare type RequestParams<T extends AspidaMethodParams> = {
    path: string;
    method: HttpMethod;
    values: Record<string, string | number>;
} & Pick<T, 'query' | 'reqBody' | 'reqHeaders'>;
declare type HttpStatusNoOk = 301 | 302 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 409 | 500 | 501 | 502 | 503 | 504 | 505;
declare type PartiallyPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
declare type BaseResponse<T, U, V> = {
    status: V extends number ? V : HttpStatusOk;
    resBody: T;
    resHeaders: U;
};
export declare type PartialResponse = PartiallyPartial<BaseResponse<any, any, HttpStatusOk | HttpStatusNoOk>, 'resBody' | 'resHeaders'>;
export declare type MockResponse<K extends AspidaMethodParams = {
    resBody: {};
    resHeaders: {};
}> = (K['resBody'] extends {} | null ? K['resHeaders'] extends {} ? BaseResponse<K['resBody'], K['resHeaders'], K['status']> : PartiallyPartial<BaseResponse<K['resBody'], K['resHeaders'] extends {} | undefined ? K['resHeaders'] : undefined, K['status']>, 'resHeaders'> : K['resHeaders'] extends {} ? PartiallyPartial<BaseResponse<K['resBody'] extends {} | null | undefined ? K['resBody'] : undefined, K['resHeaders'], K['status']>, 'resBody'> : PartiallyPartial<BaseResponse<K['resBody'] extends {} | null | undefined ? K['resBody'] : undefined, K['resHeaders'] extends {} | undefined ? K['resHeaders'] : undefined, K['status']>, 'resBody' | 'resHeaders'>) | PartiallyPartial<BaseResponse<any, any, HttpStatusNoOk>, 'resBody' | 'resHeaders'>;
export declare type MockMethods<T extends AspidaMethods> = {
    [K in keyof T]?: (req: RequestParams<T[K]>) => MockResponse<T[K]> | Promise<MockResponse<T[K]>>;
};
export {};
//# sourceMappingURL=types.d.ts.map