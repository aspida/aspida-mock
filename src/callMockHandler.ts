import { HttpMethod, LowerHttpMethod } from 'aspida';
import { MiddlewareHandler, MockRequestConfig, MockRequestConfigAndValues, MockRoute } from './';
import { MockResponse, PartialResponse } from './types';
import { copyData, createPathRegExp, createValues } from './utils';

const findHandler = (path: string, method: HttpMethod, routes: MockRoute[]) =>
  routes.find(
    route =>
      createPathRegExp(route.path).test(path) &&
      route.methods[method.toLowerCase() as LowerHttpMethod]
  );

export const hasMockHandler = (path: string, method: HttpMethod, routes: MockRoute[]) =>
  !!findHandler(path, method, routes)?.methods[method.toLowerCase() as LowerHttpMethod];

export default async (
  config: MockRequestConfig,
  routes: MockRoute[],
  middleware?: MiddlewareHandler[]
) => {
  const route = findHandler(config.path, config.method, routes);
  const controller = route?.methods[config.method.toLowerCase() as LowerHttpMethod];

  if (!route || !controller) return;

  let params: MockRequestConfigAndValues = {
    ...config,
    values: createValues(route.path, config.path),
  };

  if (middleware) {
    for (let i = 0; i < middleware.length; i += 1) {
      const { isNext, response, config } = await new Promise<{
        isNext: boolean;
        response?: PartialResponse | undefined;
        config?: MockRequestConfigAndValues | undefined;
      }>(resolve => {
        middleware[i](
          params,
          res => {
            resolve({ isNext: false, response: res });
          },
          req => {
            resolve({ isNext: true, config: req });
          }
        );
      });

      if (isNext) {
        params = config || params;
      } else {
        return copyData((response instanceof Promise ? await response : response) as MockResponse);
      }
    }
  }

  const res = controller(params);

  return copyData((res instanceof Promise ? await res : res) as MockResponse);
};
