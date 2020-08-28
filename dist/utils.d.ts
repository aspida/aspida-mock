import { LowerHttpMethod } from 'aspida';
import { MockResponse } from './types';
export declare const createPathRegExp: (path: string) => RegExp;
export declare const httpMethods: LowerHttpMethod[];
export declare const copyData: (res: MockResponse) => MockResponse;
export declare const createValues: (path: string, relativePath: string) => Record<string, string | number>;
//# sourceMappingURL=utils.d.ts.map