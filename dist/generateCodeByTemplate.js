"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camelCase_1 = require("./util/camelCase");
var warn_1 = require("./util/warn");
var PLACEHOLDER_INDEX = "_index"; // index 占位符
var defaultTagRE = /{{((?:.|\r?\n)+?)}}/g; // vue 中提取插值表达式的正则
function generateCodeByTemplate(initCode, excelObj, config) {
    if (!initCode.match(config.reg))
        warn_1.warn("没有匹配到相应字段,请查看reg是否配置正确");
    var matchRes = initCode.match(config.reg);
    if (!matchRes)
        warn_1.warn("正则匹配不到任何文件的字段");
    var matchStr = matchRes[0]; //matchRes匹配到的是标签的前半部分
    var str = "";
    var keyList = Object.keys(excelObj);
    if (!keyList.length)
        warn_1.warn("没有从EXCEL中找到相应字段");
    // 这里做了 hack，防止读取列时，某些行缺少信息，导致最终返回行数不准确，所以去最大的行长度
    var MAX_LENGTH = Object.keys(excelObj).reduce(function (acc, cur) {
        return String(Math.max(excelObj[acc].length, excelObj[cur].length));
    });
    var _loop_1 = function (i) {
        /**替换 template 中的字段**/
        str += config.template.replace(defaultTagRE, function (_, /*插值表达式中的变量*/ templateVariable) {
            if (templateVariable === PLACEHOLDER_INDEX)
                return String(i);
            var option = config.options.find(function (option) { return option.as === templateVariable; });
            if (!option)
                warn_1.warn("模版的插值表达式和 as 无法关联");
            var excelValue = excelObj[templateVariable][i];
            if (!excelValue)
                return "";
            excelValue = option.camelCase ? camelCase_1.camelCase(excelValue) : excelValue;
            return "\"" + excelValue + "\"";
        });
    };
    for (var i = 0; i < Number(MAX_LENGTH); i++) {
        _loop_1(i);
    }
    //从各个匹配的位置替换原来标签
    var openTagStart = initCode.indexOf(matchStr);
    var openTagLength = matchStr.length;
    var openTagEnd = openTagStart + openTagLength;
    return initCode.slice(0, openTagEnd) + str + initCode.slice(openTagEnd);
}
exports.generateCodeByTemplate = generateCodeByTemplate;
