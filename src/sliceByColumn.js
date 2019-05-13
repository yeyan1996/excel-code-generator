"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var warn_1 = require("./util/warn");
var VALID_LINE_NUMBER = 2;
var isPositiveNum = function (num) { return num >= 0; };
function sliceByColumn(options, data) {
    var map = Array.from(new Array(26)).map(function (item, index) { return String.fromCharCode(index + 97); });
    var excelObj = {};
    options.forEach(function (option) {
        if (option.line.length !== VALID_LINE_NUMBER)
            warn_1.warn("请选择正确的截取列下标");
        var arr = [];
        data.forEach(function (rowArr) {
            var index = map.findIndex(function (item) { return item === option.line[0].toLowerCase(); });
            arr.push(rowArr[index]);
        });
        var posArr = option.line[1].split("-");
        var startPos = Number(posArr[0]) - 1;
        var endPos = Number(posArr[1]);
        if (!isPositiveNum(startPos) || !isPositiveNum(endPos))
            warn_1.warn("line的参数格式不正确");
        excelObj[option.as] = arr.slice(startPos, endPos);
    });
    return excelObj;
}
exports.sliceByColumn = sliceByColumn;
