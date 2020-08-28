"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var path_1 = __importDefault(require("path"));
var minimist_1 = __importDefault(require("minimist"));
var commands_1 = require("aspida/dist/commands");
var buildRouteFile_1 = __importDefault(require("./buildRouteFile"));
var writeRouteFile_1 = __importDefault(require("aspida/dist/writeRouteFile"));
var watchInputDir_1 = __importDefault(require("aspida/dist/watchInputDir"));
exports.run = function (args) {
    var argv = minimist_1.default(args, {
        string: ['version', 'config', 'watch'],
        alias: { v: 'version', c: 'config', w: 'watch' }
    });
    (argv.version !== undefined
        ? function () { return console.log("v" + require(path_1.default.join(__dirname, '../../package.json')).version); }
        : argv.watch !== undefined
            ? function () {
                return commands_1.getConfigs(argv.config).forEach(function (config) {
                    writeRouteFile_1.default(buildRouteFile_1.default(config));
                    watchInputDir_1.default(config.input, function () { return writeRouteFile_1.default(buildRouteFile_1.default(config)); });
                });
            }
            : function () { return commands_1.getConfigs(argv.config).map(buildRouteFile_1.default).forEach(writeRouteFile_1.default); })();
};
//# sourceMappingURL=index.js.map