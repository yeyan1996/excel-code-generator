import { Config, ExcelObj } from "./interface/index";
import { camelCase } from "./util/cameCase";

export function generateFromTemplate(
  initCode: string,
  excelObj: ExcelObj,
  config: Config
): string {
  if (!initCode.match(config.reg))
    throw new Error("没有匹配到相应字段,请查看格式");
  let matchRes: null | string[] = initCode.match(config.reg);
  if (!matchRes) throw new Error("正则匹配不到任何文件的字段");
  let matchStr: string = matchRes[0]; //matchRes匹配到的是标签的前半部分
  let str = "";

  const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  let keyList: string[] = Object.keys(excelObj);
  if (!keyList.length) {
    console.error("没有从EXCEL中找到相应字段");
    process.exitCode = 1;
  }
  for (let i = 0; i < excelObj[keyList[0]].length; i++) {
    str += config.template.replace(
      defaultTagRE,
      ($0, $1): string => {
        if (excelObj[$1][i] === undefined) return "";
        let shouldCamelCase = !!config.options[$1].camelCase;
        if (shouldCamelCase) excelObj[$1][i] = camelCase(excelObj[$1][i]);
        return `'${excelObj[$1][i]}'`;
      }
    );
  }
  //从各个匹配的位置替换原来标签
  let openTagStart = initCode.indexOf(matchStr);
  let openTagLength = matchStr.length;
  let openTagEnd = openTagStart + openTagLength;
  return (
    initCode.substring(0, openTagEnd) + str + initCode.substring(openTagEnd)
  );
}
