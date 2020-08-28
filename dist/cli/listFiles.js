"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var listFiles = function (targetDir) {
    var list = [];
    fs_1.default.readdirSync(targetDir).forEach(function (file) {
        if (file.startsWith('$') || file.startsWith('@'))
            return;
        var target = path_1.default.posix.join(targetDir, file);
        if (fs_1.default.statSync(target).isFile()) {
            if (/(\n|^)export default/.test(fs_1.default.readFileSync(target, 'utf8'))) {
                list.push(target);
            }
        }
        else if (fs_1.default.statSync(target).isDirectory()) {
            list.push.apply(list, __spread(listFiles(target)));
        }
    });
    return list;
};
exports.default = listFiles;
//# sourceMappingURL=listFiles.js.map