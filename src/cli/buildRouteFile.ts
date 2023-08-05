import { AspidaConfig } from 'aspida/dist/cjs/commands';
import fs from 'fs';
import path from 'path';
import createRouteString from './createRouteString';
import listFiles from './listFiles';

const hasMiddleware = (input: string) =>
  fs.existsSync(path.join(input, '@middleware')) ||
  fs.existsSync(path.join(input, '@middleware.ts'));

export default ({ input, trailingSlash }: AspidaConfig) => ({
  text: createRouteString(
    input,
    trailingSlash,
    hasMiddleware(input),
    listFiles(input).sort().reverse()
  ),
  filePath: path.posix.join(input, `$mock.ts`),
});
