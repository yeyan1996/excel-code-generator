import { Option, ExcelObj } from "./interface/index";

const VALID_LINE_NUMBER = 2;

const isPositiveNum = (num: number): boolean => num >= 0;
export function sliceByColumn(options: Option[], data: any[][]): ExcelObj {
  let map: string[] = Array.from(new Array(26)).map(
    (item, index): string => String.fromCharCode(index + 97)
  );
  let excelObj: ExcelObj = {};
  options.forEach(
    (option): void => {
      if (option.line.length !== VALID_LINE_NUMBER)
        throw Error("请选择正确的截取列下标");
      let arr: any[] = [];
      data.forEach(
        (rowArr): void => {
          let index: number = map.findIndex(
            (item): boolean => item === option.line[0].toLowerCase()
          );
          arr.push(rowArr[index]);
        }
      );
      // if (option.cameCase) {
      //     slicedItem = slicedItem.map(item => {
      //         return item.toLowerCase().replace(/_(\w)/g, function (match) {
      //             return match.slice(1, 2).toUpperCase();
      //         })
      //     })
      // }
      let posArr: string[] = option.line[1].split("-");
      let startPos: number = Number(posArr[0]) - 1;
      let endPos = Number(posArr[1]);
      if (!isPositiveNum(startPos) || !isPositiveNum(endPos)) {
        console.error("line的参数格式不正确");
        process.exitCode = 1;
      }
      excelObj[option.as] = arr.slice(startPos, endPos);
    }
  );
  return excelObj;
}
