import { config } from "./config";
import * as xlsx from "node-xlsx";
import * as fs from "fs";
import { compose } from "./util/compose";
import { normalizeConfig } from "./util/normalizeConfig";
import { sliceByColumn } from "./sliceByColumn";
import { generateFromTemplate } from "./generateFromTemplate";
import { NormalizedConfig } from "./interface";

let normalizedConfig: NormalizedConfig = normalizeConfig(config);
let generateBuffer = compose(
  xlsx.parse,
  fs.readFileSync
);
let workSheetsFromBuffer = generateBuffer(normalizedConfig.excelPath); //返回一个二进制Buffer
let { data } = workSheetsFromBuffer[normalizedConfig.sheet - 1]; //第几张sheet

function readFile(): string {
  let readData: string = fs.readFileSync(
    normalizedConfig.targetPath.readPath,
    "utf-8"
  );
  console.log("read success!");
  return readData;
}

function writeFile(writeData: string): void {
  fs.writeFileSync(normalizedConfig.targetPath.writePath, writeData);
  console.log("write success!");
}

let colObj = sliceByColumn(normalizedConfig.options, data);
console.log(colObj);

function init(): void {
  let readData: string = readFile();
  let replacedCode = generateFromTemplate(readData, colObj, normalizedConfig);
  writeFile(replacedCode);
}

init();
