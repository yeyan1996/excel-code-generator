"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var fp_1 = require("lodash/fp");
var normalizeConfig_1 = require("./util/normalizeConfig");
var sliceByColumn_1 = require("./sliceByColumn");
var generateCodeByTemplate_1 = require("./generateCodeByTemplate");
var warn_1 = require("./util/warn");
var node_xlsx_1 = __importDefault(require("node-xlsx"));
var fs_1 = __importDefault(require("fs"));
var normalizedConfig = normalizeConfig_1.normalizeConfig(config_1.config);
var generateBuffer = fp_1.pipe(fs_1.default.readFileSync, node_xlsx_1.default.parse);
var workSheetsFromBuffer = generateBuffer(normalizedConfig.excelPath);
var _a = (workSheetsFromBuffer[normalizedConfig.sheet - 1] || {}).data, data = _a === void 0 ? null : _a; // 第 x 张sheet 中的数据
if (!data) {
    warn_1.warn("没有找到相应的excel数据");
}
function readFile() {
    var readData = fs_1.default.readFileSync(normalizedConfig.targetPath, "utf-8");
    console.log("read success!");
    return readData;
}
function writeFile(writeData) {
    fs_1.default.writeFileSync(normalizedConfig.targetPath, writeData);
    console.log("write success!");
}
var colObj = sliceByColumn_1.sliceByColumn(normalizedConfig.options, data);
function init() {
    var readData = readFile();
    var replacedCode = generateCodeByTemplate_1.generateCodeByTemplate(readData, colObj, normalizedConfig);
    writeFile(replacedCode);
}
init();
