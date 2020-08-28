import { HttpMethod } from 'aspida';
import { MockRequestConfig, MockRoute, MiddlewareHandler } from './';
export declare const hasMockHandler: (path: string, method: HttpMethod, routes: MockRoute[]) => boolean;
declare const _default: (config: MockRequestConfig, routes: MockRoute[], middleware?: MiddlewareHandler[] | undefined) => Promise<(Pick<{
    status: 301 | 302 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 409 | 500 | 501 | 502 | 503 | 504 | 505;
    resBody: any;
    resHeaders: any;
}, "status"> & Partial<Pick<{
    status: 301 | 302 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 409 | 500 | 501 | 502 | 503 | 504 | 505;
    resBody: any;
    resHeaders: any;
}, "resHeaders" | "resBody">>) | {
    status: import("aspida").HttpStatusOk;
    resBody: {};
    resHeaders: {};
} | undefined>;
export default _default;
//# sourceMappingURL=callMockHandler.d.ts.map