"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var warn_1 = require("./warn");
var VALID_LINE_NUMBER = 3;
var isPositiveNum = function (num) { return num >= 0; };
function sliceByColumn(data, option) {
    // 生成 a-z 的数组
    var alphabetArr = Array.from(new Array(26)).map(function (item, index) { return String.fromCharCode(index + 97); });
    if (option.line.length !== VALID_LINE_NUMBER) {
        warn_1.warn("错误的 line 配置项");
    }
    var index = alphabetArr.findIndex(function (item) { return item === option.line[0].toLowerCase(); });
    var columnData = data.map(function (rowArr) { return rowArr[index]; });
    var startPos = Number(option.line[1]) - 1;
    var endPos = Number(option.line[2]);
    if (!isPositiveNum(startPos) || !isPositiveNum(endPos)) {
        warn_1.warn("line的参数格式不正确");
    }
    return columnData.slice(startPos, endPos);
}
exports.sliceByColumn = sliceByColumn;
