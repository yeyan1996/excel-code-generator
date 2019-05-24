import { Config, ExcelObj } from "./interface";
import { camelCase } from "./util/camelCase";
import { warn } from "./util/warn";

export function generateFromTemplate(
  initCode: string,
  excelObj: ExcelObj,
  config: Config
): string {
  if (!initCode.match(config.reg))
    warn("没有匹配到相应字段,请查看reg是否配置正确");

  let matchRes: RegExpMatchArray | null = initCode.match(config.reg);
  if (!matchRes) warn("正则匹配不到任何文件的字段");
  //非空断言操作符，告知ts走到这里的matchRes一定不是null
  let matchStr: string = matchRes![0]; //matchRes匹配到的是标签的前半部分
  let str = "";

  const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  let keyList: string[] = Object.keys(excelObj);
  if (!keyList.length) warn("没有从EXCEL中找到相应字段");

  //不知道为什么 reduce 的返回值必须和数组元素相同-.-
  // 这里做了 hack，防止读取列时，某些行缺少信息，导致最终返回行数不准确，所以去最大的行长度
  const MAX_LENGTH: string = Object.keys(excelObj).reduce(
    (pre, cur): string =>
      String(Math.max(excelObj[pre].length, excelObj[cur].length))
  );

  for (let i = 0; i < Number(MAX_LENGTH); i++) {
    /**替换 template 中的字段**/
    str += config.template.replace(
      defaultTagRE,
      ($0, $1): string => {
        if ($1 === "_index") return String(i);

        let option: any = config.options.find(
          (option): boolean => option.as === $1
        );
        if (!option) warn("模版的插值表达式和 as 无法关联");

        if (excelObj[$1][i] === undefined) return "";
        let shouldCamelCase = option.camelCase;
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
