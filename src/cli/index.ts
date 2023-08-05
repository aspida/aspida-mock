import { getConfigs } from 'aspida/dist/cjs/commands';
import watch from 'aspida/dist/cjs/watchInputDir';
import write from 'aspida/dist/cjs/writeRouteFile';
import minimist from 'minimist';
import build from './buildRouteFile';

export const run = (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'config', 'watch'],
    alias: { v: 'version', c: 'config', w: 'watch' },
  });

  // eslint-disable-next-line no-unused-expressions
  argv.version !== undefined
    ? console.log(`v${require('../../package.json').version}`)
    : argv.watch !== undefined
    ? getConfigs(argv.config).forEach(config => {
        write(build(config));
        watch(config.input, () => write(build(config)));
      })
    : getConfigs(argv.config).map(build).forEach(write);
};
