"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VALID_LINE_NUMBER = 2;
var isPositiveNum = function (num) { return num >= 0; };
function sliceByColumn(options, data) {
    var map = Array.from(new Array(26)).map(function (item, index) { return String.fromCharCode(index + 97); });
    var excelObj = {};
    options.forEach(function (option) {
        if (option.line.length !== VALID_LINE_NUMBER)
            throw Error("请选择正确的截取列下标");
        var arr = [];
        data.forEach(function (rowArr) {
            var index = map.findIndex(function (item) { return item === option.line[0].toLowerCase(); });
            arr.push(rowArr[index]);
        });
        // if (option.cameCase) {
        //     slicedItem = slicedItem.map(item => {
        //         return item.toLowerCase().replace(/_(\w)/g, function (match) {
        //             return match.slice(1, 2).toUpperCase();
        //         })
        //     })
        // }
        var posArr = option.line[1].split("-");
        var startPos = Number(posArr[0]) - 1;
        var endPos = Number(posArr[1]);
        if (!isPositiveNum(startPos) || !isPositiveNum(endPos)) {
            console.error("line的参数格式不正确");
            process.exitCode = 1;
        }
        excelObj[option.as] = arr.slice(startPos, endPos);
    });
    return excelObj;
}
exports.sliceByColumn = sliceByColumn;
