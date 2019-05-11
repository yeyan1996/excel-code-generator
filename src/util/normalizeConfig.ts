import * as fs from "fs";
import { Config } from "../interface";

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function normalizeExcelPath(excelPath: string): string {
  const extList: string[] = ["xlsx", "xlxm", "xls"];
  for (let i = 0; i < extList.length; i++) {
    let exist: boolean = fs.existsSync(excelPath);
    if (exist) break;
    let arr: string[] = excelPath.split(".");
    arr[arr.length - 1] = extList[i];
    excelPath = arr.join(".");
    if (i === extList.length) {
      console.error("找不到对应文件");
      process.exitCode = 1;
    }
  }
  return excelPath;
}

function normalizeTemplate(template: string): string {
  return template.replace(defaultTagRE, ($0, $1): string => `{{${$1.trim()}}}`);
}

export function normalizeConfig(config: Config): Config {
  let normalizedConfig: any = config;
  normalizedConfig.excelPath = normalizeExcelPath(config.excelPath);
  normalizedConfig.template = normalizeTemplate(config.template);
  return normalizedConfig;
}
