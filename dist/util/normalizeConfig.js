"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var warn_1 = require("./warn");
var path_1 = __importDefault(require("path"));
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var interpolationExpressionRE = /{{((?:.|\r?\n)+?)}}/g; // 匹配插值表达式
var extList = ["xlsx", "xlxm", "xls"];
// 尝试匹配可能的扩展名
function normalizeExcelPath(excelPath) {
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
function normalizeTargetPath(target) {
    if (!path_1.default.isAbsolute(target))
        target = path_1.default.resolve(__dirname, "../..", target);
    return target;
}
function normalizeTemplate(template) {
    return template.replace(interpolationExpressionRE, function (_, templateVariable) { return "{{" + templateVariable.trim() + "}}"; });
}
function normalizeConfig(config) {
    var normalizedConfig = cloneDeep_1.default(config); //深拷贝防止原始的引用类型被修改
    normalizedConfig.excelPath = normalizeExcelPath(config.excelPath);
    normalizedConfig.target = normalizeTargetPath(config.target);
    normalizedConfig.template = normalizeTemplate(config.template);
    return normalizedConfig;
}
exports.normalizeConfig = normalizeConfig;
