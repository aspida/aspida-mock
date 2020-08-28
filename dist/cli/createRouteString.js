"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createImportPath = function (filePath, inputDir) {
    return filePath
        .replace(new RegExp("^(.\\/)?" + inputDir.replace(/^.\//, '').replace(/\/$/, '')), '')
        .replace(/'/g, "\\'")
        .replace(/\.ts$/, '');
};
var createCondition = function (filePath, inputDir, methods, trailingSlash) { return "\n  { path: '" + (createImportPath(filePath, inputDir).replace(/(\/index)$/, '') || '') + (trailingSlash ? '/' : '') + "', methods: " + methods + " }"; };
exports.default = (function (inputDir, trailingSlash, hasMiddleware, pathList) {
    return "/* eslint-disable */\nimport { MockClient, MockConfig } from 'aspida-mock'\n" + (hasMiddleware ? "import baseMiddleware from './@middleware'\n" : '') + "import api from './$api'\n" + pathList
        .map(function (filePath, i) { return "import mock" + i + " from '." + createImportPath(filePath, inputDir) + "'\n"; })
        .join('') + "\nexport const mockRoutes = () => [" + pathList
        .map(function (filePath, i) { return createCondition(filePath, inputDir, "mock" + i, trailingSlash); })
        .join(',') + "\n]\n\nexport default <U>(client: MockClient<U>, config?: MockConfig) => {" + (hasMiddleware
        ? '\n  const middleware = [...baseMiddleware, ...(config && config.middleware || [])]'
        : '') + "\n  client.attachRoutes(mockRoutes(), " + (hasMiddleware ? '{ ...config, middleware }' : 'config') + ")\n\n  return api(client)\n}\n";
});
//# sourceMappingURL=createRouteString.js.map