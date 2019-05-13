"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var warn_1 = require("./warn");
var lodash_1 = require("lodash");
var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
function normalizeExcelPath(excelPath) {
    var extList = ["xlsx", "xlxm", "xls"];
    for (var i = 0; i < extList.length; i++) {
        var exist = fs.existsSync(excelPath);
        if (exist)
            break;
        var arr = excelPath.split(".");
        arr[arr.length - 1] = extList[i];
        excelPath = arr.join(".");
        if (i === extList.length)
            warn_1.warn("找不到对应文件");
    }
    return excelPath;
}
function normalizeTargetPath(targetPath) {
    if (!path.isAbsolute(targetPath))
        targetPath = path.resolve(__dirname, '../..', targetPath);
    return targetPath;
}
function normalizeTemplate(template) {
    return template.replace(defaultTagRE, function ($0, $1) { return "{{" + $1.trim() + "}}"; });
}
function normalizeConfig(config) {
    var normalizedConfig = lodash_1.cloneDeep(config); //深拷贝防止原始的引用类型被修改
    normalizedConfig.excelPath = normalizeExcelPath(config.excelPath);
    normalizedConfig.targetPath = normalizeTargetPath(config.targetPath);
    normalizedConfig.template = normalizeTemplate(config.template);
    return normalizedConfig;
}
exports.normalizeConfig = normalizeConfig;
