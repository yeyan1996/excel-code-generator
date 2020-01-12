import { Option } from "./interface";
import { warn } from "./warn";

const VALID_LINE_NUMBER = 3;
const isPositiveNum = (num: number) => num >= 0;

export function sliceByColumn(data: string[][], option: Option): string[] {
  // 生成 a-z 的数组
  const alphabetArr: string[] = Array.from(
    new Array(26)
  ).map((item, index): string => String.fromCharCode(index + 97));

  if (option.line.length !== VALID_LINE_NUMBER) {
    warn("错误的 line 配置项");
  }

  const index = alphabetArr.findIndex(
    item => item === option.line[0].toLowerCase()
  );
  const columnData: string[] = data.map(rowArr => rowArr[index]);

  let startPos = Number(option.line[1]) - 1;
  let endPos = Number(option.line[2]);

  if (!isPositiveNum(startPos) || !isPositiveNum(endPos)) {
    warn("line的参数格式不正确");
  }
  return columnData.slice(startPos, endPos);
}
