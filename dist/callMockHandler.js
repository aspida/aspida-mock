"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMockHandler = void 0;
var utils_1 = require("./utils");
var findHandler = function (path, method, routes) {
    return routes.find(function (route) {
        return utils_1.createPathRegExp(route.path).test(path) &&
            route.methods[method.toLowerCase()];
    });
};
exports.hasMockHandler = function (path, method, routes) { var _a; return !!((_a = findHandler(path, method, routes)) === null || _a === void 0 ? void 0 : _a.methods[method.toLowerCase()]); };
exports.default = (function (config, routes, middleware) { return __awaiter(void 0, void 0, void 0, function () {
    var route, params, _loop_1, i, state_1, res, _a, _b;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                route = findHandler(config.path, config.method, routes);
                if (!route)
                    return [2 /*return*/];
                params = __assign(__assign({}, config), { values: utils_1.createValues(route.path, config.path) });
                if (!middleware) return [3 /*break*/, 4];
                _loop_1 = function (i) {
                    var _a, isNext, response, config_1, _b, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0: return [4 /*yield*/, new Promise(function (resolve) {
                                    middleware[i](params, function (res) {
                                        resolve({ isNext: false, response: res });
                                    }, function (req) {
                                        resolve({ isNext: true, config: req });
                                    });
                                })];
                            case 1:
                                _a = _e.sent(), isNext = _a.isNext, response = _a.response, config_1 = _a.config;
                                if (!isNext) return [3 /*break*/, 2];
                                params = config_1 || params;
                                return [3 /*break*/, 6];
                            case 2:
                                _b = {};
                                _c = utils_1.copyData;
                                if (!(response instanceof Promise)) return [3 /*break*/, 4];
                                return [4 /*yield*/, response];
                            case 3:
                                _d = _e.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                _d = response;
                                _e.label = 5;
                            case 5: return [2 /*return*/, (_b.value = _c.apply(void 0, [(_d)]), _b)];
                            case 6: return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _e.label = 1;
            case 1:
                if (!(i < middleware.length)) return [3 /*break*/, 4];
                return [5 /*yield**/, _loop_1(i)];
            case 2:
                state_1 = _e.sent();
                if (typeof state_1 === "object")
                    return [2 /*return*/, state_1.value];
                _e.label = 3;
            case 3:
                i += 1;
                return [3 /*break*/, 1];
            case 4:
                res = (_d = (_c = route.methods)[config.method.toLowerCase()]) === null || _d === void 0 ? void 0 : _d.call(_c, params);
                _a = utils_1.copyData;
                if (!(res instanceof Promise)) return [3 /*break*/, 6];
                return [4 /*yield*/, res];
            case 5:
                _b = _e.sent();
                return [3 /*break*/, 7];
            case 6:
                _b = res;
                _e.label = 7;
            case 7: return [2 /*return*/, _a.apply(void 0, [(_b)])];
        }
    });
}); });
//# sourceMappingURL=callMockHandler.js.map