import * as fs from "fs";
import * as path from 'path'
import { Config } from "../interface";
import { warn } from "./warn";
import {cloneDeep} from 'lodash'
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function normalizeExcelPath(excelPath: string): string {
  const extList: string[] = ["xlsx", "xlxm", "xls"];
  for (let i = 0; i < extList.length; i++) {
    let exist: boolean = fs.existsSync(excelPath);
    if (exist) break;
    let arr: string[] = excelPath.split(".");
    arr[arr.length - 1] = extList[i];
    excelPath = arr.join(".");
    if (i === extList.length) warn("找不到对应文件");
  }
  return excelPath;
}

function normalizeTargetPath(targetPath:string):string {
  if(!path.isAbsolute(targetPath))targetPath = path.resolve(__dirname,'../..',targetPath)
  return targetPath
}

function normalizeTemplate(template: string): string {
  return template.replace(defaultTagRE, ($0, $1): string => `{{${$1.trim()}}}`);
}

export function normalizeConfig(config: Config): Config {
  let normalizedConfig: Config = cloneDeep(config); //深拷贝防止原始的引用类型被修改
  normalizedConfig.excelPath = normalizeExcelPath(config.excelPath);
  normalizedConfig.targetPath = normalizeTargetPath(config.targetPath);
  normalizedConfig.template = normalizeTemplate(config.template);
  return normalizedConfig;
}
