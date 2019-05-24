"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var warn_1 = require("./warn");
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
function normalizeExcelPath(excelPath) {
    var extList = ["xlsx", "xlxm", "xls"];
    for (var i = 0; i < extList.length; i++) {
        var exist = fs_1.existsSync(excelPath);
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
    if (!path_1.default.isAbsolute(targetPath))
        targetPath = path_1.default.resolve(__dirname, "../..", targetPath);
    return targetPath;
}
function normalizeTemplate(template) {
    return template.replace(defaultTagRE, function ($0, $1) { return "{{" + $1.trim() + "}}"; });
}
function normalizeConfig(config) {
    var normalizedConfig = cloneDeep_1.default(config); //深拷贝防止原始的引用类型被修改
    normalizedConfig.excelPath = normalizeExcelPath(config.excelPath);
    normalizedConfig.targetPath = normalizeTargetPath(config.targetPath);
    normalizedConfig.template = normalizeTemplate(config.template);
    return normalizedConfig;
}
exports.normalizeConfig = normalizeConfig;
//# sourceMappingURL=normalizeConfig.js.map