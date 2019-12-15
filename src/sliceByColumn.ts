import { Option, ExcelObj } from "./interface";
import { warn } from "./util/warn";

const VALID_LINE_NUMBER = 2;
const isPositiveNum = (num: number) => num >= 0;

export function sliceByColumn(options: Option[], data: string[][]): ExcelObj {
  // 生成 a-z 的数组
  const alphabetArr: string[] = Array.from(new Array(26)).map(
    (item, index): string => String.fromCharCode(index + 97)
  );

  let excelObj: ExcelObj = {};

  options.forEach(option => {
    if (option.line.length !== VALID_LINE_NUMBER) {
      warn("请选择正确的截取列下标");
    }

    const columnArr: string[] = data.map(rowArr => {
      let index = alphabetArr.findIndex(
        (item): boolean => item === option.line[0].toLowerCase()
      );
      return rowArr[index];
    });

    let posArr: string[] = option.line[1].split("-");
    let startPos = Number(posArr[0]) - 1;
    let endPos = Number(posArr[1]);

    if (!isPositiveNum(startPos) || !isPositiveNum(endPos)) {
      warn("line的参数格式不正确");
    }

    excelObj[option.as] = columnArr.slice(startPos, endPos);
  });
  return excelObj;
}
