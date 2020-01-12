"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fp_1 = require("lodash/fp");
var fs_1 = __importDefault(require("fs"));
var node_xlsx_1 = __importDefault(require("node-xlsx"));
var config_1 = require("./config");
var utils_1 = require("./utils");
var q = function (path, sheet) {
    var generateBuffer = fp_1.pipe(fs_1.default.readFileSync, node_xlsx_1.default.parse);
    var workSheetsFromBuffer = generateBuffer(config_1.config.excelPath);
    var _a = (workSheetsFromBuffer[config_1.config.sheet - 1] || {}).data, data = _a === void 0 ? null : _a; // 第 x 张sheet 中的数据
    if (!data) {
        utils_1.warn("没有找到相应的excel数据");
    }
};
