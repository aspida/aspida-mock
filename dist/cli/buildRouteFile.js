"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var listFiles_1 = __importDefault(require("./listFiles"));
var createRouteString_1 = __importDefault(require("./createRouteString"));
var hasMiddleware = function (input) {
    return fs_1.default.existsSync(path_1.default.join(input, '@middleware')) ||
        fs_1.default.existsSync(path_1.default.join(input, '@middleware.ts'));
};
exports.default = (function (_a) {
    var input = _a.input, trailingSlash = _a.trailingSlash;
    return ({
        text: createRouteString_1.default(input, trailingSlash, hasMiddleware(input), listFiles_1.default(input).sort().reverse()),
        filePath: path_1.default.posix.join(input, "$mock.ts")
    });
});
//# sourceMappingURL=buildRouteFile.js.map