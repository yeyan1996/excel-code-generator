import { Option, ExcelObj } from "./interface";
import { warn } from "./util/warn";

const VALID_LINE_NUMBER = 2;

const isPositiveNum = (num: number): boolean => num >= 0;
export function sliceByColumn(options: Option[], data: string[][]): ExcelObj {
  let map: string[] = Array.from(new Array(26)).map(
    (item, index): string => String.fromCharCode(index + 97)
  );
  let excelObj: ExcelObj = {};
  options.forEach(
    (option): void => {
      if (option.line.length !== VALID_LINE_NUMBER)
        warn("请选择正确的截取列下标");

      let arr: string[] = [];
      data.forEach(
        (rowArr): void => {
          let index: number = map.findIndex(
            (item): boolean => item === option.line[0].toLowerCase()
          );
          arr.push(rowArr[index]);
        }
      );
      let posArr: string[] = option.line[1].split("-");
      let startPos: number = Number(posArr[0]) - 1;
      let endPos = Number(posArr[1]);
      if (!isPositiveNum(startPos) || !isPositiveNum(endPos))
        warn("line的参数格式不正确");
      excelObj[option.as] = arr.slice(startPos, endPos);
    }
  );
  return excelObj;
}
