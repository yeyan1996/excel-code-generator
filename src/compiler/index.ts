import { generateCodeByOption } from "../generateCodeByOption";
import { Option } from "../interface";

export const excel = (
  strs: TemplateStringsArray,
  ...options: Option[]
): string => {
  let res = "";
  let maxNumber = 0;

  const selectedExcelData = options.map((option: Option) => {
    const number = 1 + option.line[2] - option.line[1];
    maxNumber = Math.max(number, maxNumber);
    return generateCodeByOption(option);
  });

  const codeFunc = (rowIndex: number) =>
    strs.map(
      (str, columnIndex) =>
        str + (selectedExcelData[columnIndex]?.[rowIndex] || "")
    );
  for (let rowIndex = 0; rowIndex < maxNumber; rowIndex++) {
    res += codeFunc(rowIndex).join("");
  }
  return res;
};
