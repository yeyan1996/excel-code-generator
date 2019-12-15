"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var warn_1 = require("./util/warn");
var VALID_LINE_NUMBER = 2;
var isPositiveNum = function (num) { return num >= 0; };
function sliceByColumn(options, data) {
    // 生成 a-z 的数组
    var alphabetArr = Array.from(new Array(26)).map(function (item, index) { return String.fromCharCode(index + 97); });
    var excelObj = {};
    options.forEach(function (option) {
        if (option.line.length !== VALID_LINE_NUMBER) {
            warn_1.warn("请选择正确的截取列下标");
        }
        var columnArr = data.map(function (rowArr) {
            var index = alphabetArr.findIndex(function (item) { return item === option.line[0].toLowerCase(); });
            return rowArr[index];
        });
        var posArr = option.line[1].split("-");
        var startPos = Number(posArr[0]) - 1;
        var endPos = Number(posArr[1]);
        if (!isPositiveNum(startPos) || !isPositiveNum(endPos)) {
            warn_1.warn("line的参数格式不正确");
        }
        excelObj[option.as] = columnArr.slice(startPos, endPos);
    });
    return excelObj;
}
exports.sliceByColumn = sliceByColumn;
