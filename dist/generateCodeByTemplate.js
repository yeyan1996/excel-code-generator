"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var getExcelData_1 = require("./getExcelData");
var sliceByColumn_1 = require("./sliceByColumn");
function fillCode(initCode, reg, fillCode) {
    if (!initCode.match(reg))
        utils_1.warn("没有匹配到相应字段,请查看reg是否配置正确");
    var matchRes = initCode.match(reg);
    if (!matchRes)
        utils_1.warn("正则匹配不到任何文件的字段");
    var matchStr = matchRes[0]; //matchRes匹配到的是标签的前半部分
    //从各个匹配的位置替换原来标签
    var openTagStart = initCode.indexOf(matchStr);
    var openTagLength = matchStr.length;
    var openTagEnd = openTagStart + openTagLength;
    return initCode.slice(0, openTagEnd) + fillCode + initCode.slice(openTagEnd);
}
exports.fillCode = fillCode;
function generateCodeByOption(option) {
    var excelPath = option.source;
    var sheet = option.sheet || 1;
    var data = getExcelData_1.getExcelData(excelPath, sheet);
    return sliceByColumn_1.sliceByColumn(data, option);
}
exports.generateCodeByOption = generateCodeByOption;
