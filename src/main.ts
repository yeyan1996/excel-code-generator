import { config } from "./config";
import * as xlsx from "node-xlsx";
import * as fs from "fs";
import { compose } from "./util/compose";
import { normalizeConfig } from "./util/normalizeConfig";
import { sliceByColumn } from "./sliceByColumn";
import { generateFromTemplate } from "./generateFromTemplate";
import { ExcelObj, Config } from "./interface";
import { warn } from "./util/warn";

let normalizedConfig: Config = normalizeConfig(config);
let generateBuffer: Function = compose(
  xlsx.parse,
  fs.readFileSync
);
let workSheetsFromBuffer: { name: string; data: any[] }[] = generateBuffer(
  normalizedConfig.excelPath
);
let { data = null } = workSheetsFromBuffer[normalizedConfig.sheet - 1] || {}; //第几张sheet

if (!data) warn("没有找到相应的excel数据");

function readFile(): string {
  let readData: string = fs.readFileSync(normalizedConfig.targetPath, "utf-8");
  console.log("read success!");
  return readData;
}

function writeFile(writeData: string): void {
  fs.writeFileSync(normalizedConfig.targetPath, writeData);
  console.log("write success!");
}

let colObj: ExcelObj = sliceByColumn(normalizedConfig.options, data!);

function init(): void {
  let readData: string = readFile();
  let replacedCode = generateFromTemplate(readData, colObj, normalizedConfig);
  writeFile(replacedCode);
}

init();
