import { Config, ExcelObj, Option } from "./interface";
import { camelCase } from "./util/camelCase";
import { warn } from "./util/warn";

const PLACEHOLDER_INDEX = "_index"; // index 占位符
const defaultTagRE = /{{((?:.|\r?\n)+?)}}/g; // vue 中提取插值表达式的正则

export function generateCodeByTemplate(
  initCode: string,
  excelObj: ExcelObj,
  config: Config
): string {
  if (!initCode.match(config.reg))
    warn("没有匹配到相应字段,请查看reg是否配置正确");

  let matchRes = initCode.match(config.reg);
  if (!matchRes) warn("正则匹配不到任何文件的字段");
  let matchStr: string = matchRes![0]; //matchRes匹配到的是标签的前半部分
  let str = "";

  let keyList = Object.keys(excelObj);
  if (!keyList.length) warn("没有从EXCEL中找到相应字段");

  // 这里做了 hack，防止读取列时，某些行缺少信息，导致最终返回行数不准确，所以去最大的行长度
  const MAX_LENGTH: string = Object.keys(excelObj).reduce(
    (acc, cur): string =>
      String(Math.max(excelObj[acc].length, excelObj[cur].length))
  );

  for (let i = 0; i < Number(MAX_LENGTH); i++) {
    /**替换 template 中的字段**/
    str += config.template.replace(
      defaultTagRE,
      (_, /*插值表达式中的变量*/ templateVariable): string => {
        if (templateVariable === PLACEHOLDER_INDEX) return String(i);

        let option: Option | undefined = config.options.find(
          (option): boolean => option.as === templateVariable
        );
        if (!option) warn("模版的插值表达式和 as 无法关联");

        let excelValue: string = excelObj[templateVariable][i];
        if (!excelValue) return "";

        excelValue = option!.camelCase ? camelCase(excelValue) : excelValue;
        return `"${excelValue}"`;
      }
    );
  }
  //从各个匹配的位置替换原来标签
  const openTagStart = initCode.indexOf(matchStr);
  const openTagLength = matchStr.length;
  const openTagEnd = openTagStart + openTagLength;
  return initCode.slice(0, openTagEnd) + str + initCode.slice(openTagEnd);
}
