"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateCodeByOption_1 = require("../generateCodeByOption");
exports.excel = function (strs) {
    var options = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        options[_i - 1] = arguments[_i];
    }
    var res = "";
    var maxNumber = 0;
    var selectedExcelData = options.map(function (option) {
        var number = 1 + option.line[2] - option.line[1];
        maxNumber = Math.max(number, maxNumber);
        return generateCodeByOption_1.generateCodeByOption(option);
    });
    var codeFunc = function (rowIndex) {
        return strs.map(function (str, columnIndex) { var _a; return str + (((_a = selectedExcelData[columnIndex]) === null || _a === void 0 ? void 0 : _a[rowIndex]) || ""); });
    };
    for (var rowIndex = 0; rowIndex < maxNumber; rowIndex++) {
        res += codeFunc(rowIndex).join("");
    }
    return res;
};
