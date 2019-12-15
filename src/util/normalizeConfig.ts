import { existsSync } from "fs";
import { warn } from "./warn";
import { Config } from "../interface";
import path from "path";
import cloneDeep from "lodash/cloneDeep";

const interpolationExpressionRE = /{{((?:.|\r?\n)+?)}}/g; // 匹配插值表达式
const extList: string[] = ["xlsx", "xlxm", "xls"];

// 尝试匹配可能的扩展名
function normalizeExcelPath(excelPath: string): string {
  for (let i = 0; i < extList.length; i++) {
    let exist: boolean = existsSync(excelPath);
    if (exist) break;
    let arr = excelPath.split(".");
    arr[arr.length - 1] = extList[i];
    excelPath = arr.join(".");
    if (i === extList.length) warn("找不到对应文件");
  }
  return excelPath;
}

function normalizeTargetPath(targetPath: string): string {
  if (!path.isAbsolute(targetPath))
    targetPath = path.resolve(__dirname, "../..", targetPath);
  return targetPath;
}

function normalizeTemplate(template: string): string {
  return template.replace(
    interpolationExpressionRE,
    (_, templateVariable): string => `{{${templateVariable.trim()}}}`
  );
}

export function normalizeConfig(config: Config): Config {
  let normalizedConfig: Config = cloneDeep(config); //深拷贝防止原始的引用类型被修改
  normalizedConfig.excelPath = normalizeExcelPath(config.excelPath);
  normalizedConfig.targetPath = normalizeTargetPath(config.targetPath);
  normalizedConfig.template = normalizeTemplate(config.template);
  return normalizedConfig;
}
