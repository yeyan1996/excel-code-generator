import fs from "fs";
import chalk from "chalk";
import { warn } from "./warn";
import { Config } from "./interface";
export { excel } from "./compiler";

function fillCode(initCode: string, reg: RegExp, fillCode: string): string {
  if (!initCode.match(reg)) warn("没有匹配到相应字段,请查看reg是否配置正确");

  let matchRes = initCode.match(reg);
  if (!matchRes) warn("正则匹配不到任何文件的字段");
  let matchStr: string = matchRes![0]; //matchRes匹配到的是标签的前半部分

  //从各个匹配的位置替换原来标签
  const openTagStart = initCode.indexOf(matchStr);
  const openTagLength = matchStr.length;
  const openTagEnd = openTagStart + openTagLength;
  return initCode.slice(0, openTagEnd) + fillCode + initCode.slice(openTagEnd);
}

export const gen = (config: Config) => {
  if (!config.reg || !config.target) {
    console.log(
      chalk.yellow("没有提供 reg/target 属性，显示解析后的 template")
    );
    console.log(config.template);
  } else {
    const readData = fs.readFileSync(config.target!, "utf-8");
    console.log("read success!");
    fs.writeFileSync(
      config.target!,
      fillCode(readData, config.reg, config.template)
    );
    console.log("write success!");
  }
};
