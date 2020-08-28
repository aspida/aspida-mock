import { AspidaClient, AspidaMethods, HttpMethod } from 'aspida';
import { MockMethods, MockResponse, PartialResponse } from './types';
import callMockHandler, { hasMockHandler } from './callMockHandler';
import { createValues } from './utils';
export declare const mockMethods: <T extends AspidaMethods>(methods: MockMethods<T>) => MockMethods<T>;
export declare const printLog: (config: MockRequestConfig, status: number) => void;
export declare type MockRoute = {
    path: string;
    methods: MockMethods<any>;
};
export declare type MockClient<U> = AspidaClient<U> & {
    attachRoutes(routes: MockRoute[], config?: MockConfig): void;
    detachRoutes(): void;
};
export declare type MockRequestConfig = {
    path: string;
    method: HttpMethod;
    reqBody: any | undefined;
    reqHeaders: any | undefined;
    query: any | undefined;
};
export declare type MockRequestConfigAndValues = MockRequestConfig & {
    values: ReturnType<typeof createValues>;
};
export declare type MiddlewareHandler = (req: MockRequestConfigAndValues, res: (res?: PartialResponse) => void, next: (req?: MockRequestConfigAndValues) => void) => void | Promise<void>;
export declare const mockMiddleware: (middleware: MiddlewareHandler[]) => MiddlewareHandler[];
export declare type MockConfig = {
    log?: boolean;
    delayMSec?: number;
    middleware?: MiddlewareHandler[];
};
export { MockResponse, callMockHandler, hasMockHandler };
//# sourceMappingURL=index.d.ts.map