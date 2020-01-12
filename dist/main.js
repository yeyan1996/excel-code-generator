"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
var warn_1 = require("./warn");
var compiler_1 = require("./compiler");
exports.excel = compiler_1.excel;
function fillCode(initCode, reg, fillCode) {
    if (!initCode.match(reg))
        warn_1.warn("没有匹配到相应字段,请查看reg是否配置正确");
    var matchRes = initCode.match(reg);
    if (!matchRes)
        warn_1.warn("正则匹配不到任何文件的字段");
    var matchStr = matchRes[0]; //matchRes匹配到的是标签的前半部分
    //从各个匹配的位置替换原来标签
    var openTagStart = initCode.indexOf(matchStr);
    var openTagLength = matchStr.length;
    var openTagEnd = openTagStart + openTagLength;
    return initCode.slice(0, openTagEnd) + fillCode + initCode.slice(openTagEnd);
}
exports.gen = function (config) {
    if (!config.reg || !config.target) {
        console.log(chalk_1.default.yellow("没有提供 reg/target 属性，显示解析后的 template"));
        console.log(config.template);
    }
    else {
        var readData = fs_1.default.readFileSync(config.target, "utf-8");
        console.log("read success!");
        fs_1.default.writeFileSync(config.target, fillCode(readData, config.reg, config.template));
        console.log("write success!");
    }
};
