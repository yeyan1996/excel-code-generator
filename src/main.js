"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var xlsx = __importStar(require("node-xlsx"));
var fs = __importStar(require("fs"));
var compose_1 = require("./util/compose");
var normalizeConfig_1 = require("./util/normalizeConfig");
var sliceByColumn_1 = require("./sliceByColumn");
var generateFromTemplate_1 = require("./generateFromTemplate");
var normalizedConfig = normalizeConfig_1.normalizeConfig(config_1.config);
var generateBuffer = compose_1.compose(xlsx.parse, fs.readFileSync);
var workSheetsFromBuffer = generateBuffer(normalizedConfig.excelPath); //返回一个二进制Buffer
var data = workSheetsFromBuffer[normalizedConfig.sheet - 1].data; //第几张sheet
function readFile() {
    var readData = fs.readFileSync(normalizedConfig.targetPath.readPath, "utf-8");
    console.log("read success!");
    return readData;
}
function writeFile(writeData) {
    fs.writeFileSync(normalizedConfig.targetPath.writePath, writeData);
    console.log("write success!");
}
var colObj = sliceByColumn_1.sliceByColumn(normalizedConfig.options, data);
console.log(colObj);
function init() {
    var readData = readFile();
    var replacedCode = generateFromTemplate_1.generateFromTemplate(readData, colObj, normalizedConfig);
    writeFile(replacedCode);
}
init();
