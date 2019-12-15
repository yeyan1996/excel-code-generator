import { config } from "./config";
import { pipe } from "lodash/fp";
import { normalizeConfig } from "./util/normalizeConfig";
import { sliceByColumn } from "./sliceByColumn";
import { generateCodeByTemplate } from "./generateCodeByTemplate";
import { ExcelObj } from "./interface";
import { warn } from "./util/warn";
import xlsx from "node-xlsx";
import fs from "fs";

let normalizedConfig = normalizeConfig(config);
let generateBuffer = pipe(
  fs.readFileSync,
  xlsx.parse
);
let workSheetsFromBuffer: { name: string; data: string[][] }[] = generateBuffer(
  normalizedConfig.excelPath
);

let { data = null } = workSheetsFromBuffer[normalizedConfig.sheet - 1] || {}; // 第 x 张sheet 中的数据

if (!data) {
  warn("没有找到相应的excel数据");
}

function readFile(): string {
  const readData = fs.readFileSync(normalizedConfig.targetPath, "utf-8");
  console.log("read success!");
  return readData;
}

function writeFile(writeData: string): void {
  fs.writeFileSync(normalizedConfig.targetPath, writeData);
  console.log("write success!");
}

const colObj: ExcelObj = sliceByColumn(normalizedConfig.options, data!);

function init(): void {
  const readData: string = readFile();
  const replacedCode: string = generateCodeByTemplate(
    readData,
    colObj,
    normalizedConfig
  );
  writeFile(replacedCode);
}

init();
