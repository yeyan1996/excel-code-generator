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
        if (i === extList.length) {
            console.error("找不到对应文件");
            process.exitCode = 1;
        }
    }
    return excelPath;
}
function normalizeTemplate(template) {
    return template.replace(defaultTagRE, function ($0, $1) { return "{{" + $1.trim() + "}}"; });
}
function normalizeConfig(config) {
    var normalizedConfig = config;
    normalizedConfig.excelPath = normalizeExcelPath(config.excelPath);
    normalizedConfig.template = normalizeTemplate(config.template);
    return normalizedConfig;
}
exports.normalizeConfig = normalizeConfig;
