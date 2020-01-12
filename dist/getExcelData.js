"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var node_xlsx_1 = __importDefault(require("node-xlsx"));
var fp_1 = require("lodash/fp");
var warn_1 = require("./warn");
exports.getExcelData = function (path, sheet) {
    var generateBuffer = fp_1.pipe(fs_1.default.readFileSync, node_xlsx_1.default.parse);
    var workSheetsFromBuffer = generateBuffer(path);
    var _a = (workSheetsFromBuffer[sheet - 1] || {}).data, data = _a === void 0 ? null : _a; // 第 x 张sheet 中的数据
    if (!data) {
        warn_1.warn("没有找到相应的excel数据");
    }
    return data;
};
