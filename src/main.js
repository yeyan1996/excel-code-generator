"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var node_xlsx_1 = __importDefault(require("node-xlsx"));
var fs_1 = __importDefault(require("fs"));
var compose_1 = require("./util/compose");
var normalizeConfig_1 = require("./util/normalizeConfig");
var sliceByColumn_1 = require("./sliceByColumn");
var generateFromTemplate_1 = require("./generateFromTemplate");
var warn_1 = require("./util/warn");
var normalizedConfig = normalizeConfig_1.normalizeConfig(config_1.config);
var generateBuffer = compose_1.compose(node_xlsx_1.default.parse, fs_1.default.readFileSync);
var workSheetsFromBuffer = generateBuffer(normalizedConfig.excelPath);
var _a = (workSheetsFromBuffer[normalizedConfig.sheet - 1] || {}).data, data = _a === void 0 ? null : _a; //第几张sheet
if (!data)
    warn_1.warn("没有找到相应的excel数据");
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
    var replacedCode = generateFromTemplate_1.generateFromTemplate(readData, colObj, normalizedConfig);
    writeFile(replacedCode);
}
init();
//# sourceMappingURL=main.js.map