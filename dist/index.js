"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMockHandler = exports.callMockHandler = exports.mockMiddleware = exports.printLog = exports.mockMethods = void 0;
var aspida_1 = require("aspida");
var callMockHandler_1 = __importStar(require("./callMockHandler"));
exports.callMockHandler = callMockHandler_1.default;
Object.defineProperty(exports, "hasMockHandler", { enumerable: true, get: function () { return callMockHandler_1.hasMockHandler; } });
exports.mockMethods = function (methods) { return methods; };
exports.printLog = function (config, status) {
    var searchString = aspida_1.dataToURLString(config.query || {});
    console.log("[mock] " + config.method + ": " + config.path + (searchString ? "?" + searchString : '') + " => " + status);
};
exports.mockMiddleware = function (middleware) { return middleware; };
//# sourceMappingURL=index.js.map