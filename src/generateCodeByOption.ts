import { Option } from "./interface";
import { getExcelData } from "./getExcelData";
import { sliceByColumn } from "./sliceByColumn";

export function generateCodeByOption(option: Option): string[] {
  const excelPath = option.source;
  const sheet = option.sheet || 1;
  const data = getExcelData(excelPath, sheet);
  return sliceByColumn(data, option);
}
