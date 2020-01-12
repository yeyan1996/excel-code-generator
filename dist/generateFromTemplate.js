"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camelcase_1 = require("./util/camelcase");
var warn_1 = require("./util/warn");
function generateFromTemplate(initCode, excelObj, config) {
    if (!initCode.match(config.reg))
        warn_1.warn("没有匹配到相应字段,请查看reg是否配置正确");
    var matchRes = initCode.match(config.reg);
    if (!matchRes)
        warn_1.warn("正则匹配不到任何文件的字段");
    // 非空断言操作符，告知ts走到这里的matchRes一定不是null
    var matchStr = matchRes[0]; //matchRes匹配到的是标签的前半部分
    var str = "";
    var defaultTagRE = /{{((?:.|\r?\n)+?)}}/g;
    var keyList = Object.keys(excelObj);
    if (!keyList.length)
        warn_1.warn("没有从EXCEL中找到相应字段");
    // 不知道为什么 reduce 的返回值必须和数组元素相同-.-
    // 这里做了 hack，防止读取列时，某些行缺少信息，导致最终返回行数不准确，所以去最大的行长度
    var MAX_LENGTH = Object.keys(excelObj).reduce(function (pre, cur) {
        return String(Math.max(excelObj[pre].length, excelObj[cur].length));
    });
    var _loop_1 = function (i) {
        /**替换 template 中的字段**/
        str += config.template.replace(defaultTagRE, function ($0, $1) {
            if ($1 === "_index")
                return String(i);
            var option = config.options.find(function (option) { return option.as === $1; });
            if (!option)
                warn_1.warn("模版的插值表达式和 as 无法关联");
            if (excelObj[$1][i] === undefined)
                return "";
            var shouldCamelCase = option.camelcase;
            if (shouldCamelCase)
                excelObj[$1][i] = camelcase_1.camelcase(excelObj[$1][i]);
            return "'" + excelObj[$1][i] + "'";
        });
    };
    for (var i = 0; i < Number(MAX_LENGTH); i++) {
        _loop_1(i);
    }
    //从各个匹配的位置替换原来标签
    var openTagStart = initCode.indexOf(matchStr);
    var openTagLength = matchStr.length;
    var openTagEnd = openTagStart + openTagLength;
    return (initCode.substring(0, openTagEnd) + str + initCode.substring(openTagEnd));
}
exports.generateFromTemplate = generateFromTemplate;
