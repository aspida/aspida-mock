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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValues = exports.copyData = exports.httpMethods = exports.createPathRegExp = void 0;
exports.createPathRegExp = function (path) {
    return new RegExp("^" + path.replace(/\/_[^./]+/g, '/[^/]+').replace('.', '\\.') + "$");
};
exports.httpMethods = [
    'get',
    'post',
    'put',
    'delete',
    'head',
    'options',
    'patch'
];
exports.copyData = function (res) {
    var resBody = res.resBody;
    return resBody === null ||
        typeof resBody !== 'object' ||
        (!Array.isArray(resBody) && Object.getPrototypeOf(resBody) !== Object.prototype)
        ? res
        : __assign(__assign({}, res), { resBody: JSON.parse(JSON.stringify(resBody)) });
};
exports.createValues = function (path, relativePath) {
    var values = {};
    var dirList = path.split('/');
    var parsedRequestUrl = relativePath.split('/');
    parsedRequestUrl.forEach(function (dir, i) {
        if (dirList[i].startsWith('_')) {
            var _a = __read(dirList[i].slice(1).split('@'), 2), valueName = _a[0], _b = _a[1], type = _b === void 0 ? 'number' : _b;
            var val = dir.split('.')[0];
            values[valueName.split('.')[0]] = isNaN(+val) || type !== 'number' ? val : +val;
        }
    });
    return values;
};
//# sourceMappingURL=utils.js.map