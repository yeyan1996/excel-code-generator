"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cameCase_1 = require("./util/cameCase");
function generateFromTemplate(initCode, excelObj, config) {
    if (!initCode.match(config.reg))
        throw new Error("没有匹配到相应字段,请查看格式");
    var matchRes = initCode.match(config.reg);
    if (!matchRes)
        throw new Error("正则匹配不到任何文件的字段");
    var matchStr = matchRes[0]; //matchRes匹配到的是标签的前半部分
    var str = "";
    var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
    var keyList = Object.keys(excelObj);
    if (!keyList.length) {
        console.error("没有从EXCEL中找到相应字段");
        process.exitCode = 1;
    }
    var _loop_1 = function (i) {
        str += config.template.replace(defaultTagRE, function ($0, $1) {
            if (excelObj[$1][i] === undefined)
                return "";
            var shouldCamelCase = !!config.options[$1].camelCase;
            if (shouldCamelCase)
                excelObj[$1][i] = cameCase_1.camelCase(excelObj[$1][i]);
            return "'" + excelObj[$1][i] + "'";
        });
    };
    for (var i = 0; i < excelObj[keyList[0]].length; i++) {
        _loop_1(i);
    }
    //从各个匹配的位置替换原来标签
    var openTagStart = initCode.indexOf(matchStr);
    var openTagLength = matchStr.length;
    var openTagEnd = openTagStart + openTagLength;
    return (initCode.substring(0, openTagEnd) + str + initCode.substring(openTagEnd));
}
exports.generateFromTemplate = generateFromTemplate;
