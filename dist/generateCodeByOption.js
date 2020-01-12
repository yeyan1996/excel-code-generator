"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getExcelData_1 = require("./getExcelData");
var sliceByColumn_1 = require("./sliceByColumn");
function generateCodeByOption(option) {
    var excelPath = option.source;
    var sheet = option.sheet || 1;
    var data = getExcelData_1.getExcelData(excelPath, sheet);
    return sliceByColumn_1.sliceByColumn(data, option);
}
exports.generateCodeByOption = generateCodeByOption;
