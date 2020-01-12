import fs from "fs";
import xlsx from "node-xlsx";
import { pipe } from "lodash/fp";
import { warn } from "./warn";

export const getExcelData = (path: string, sheet: number): string[][] => {
  const generateBuffer = pipe(fs.readFileSync, xlsx.parse);
  const workSheetsFromBuffer: {
    name: string;
    data: string[][];
  }[] = generateBuffer(path);

  const { data = null } = workSheetsFromBuffer[sheet - 1] || {}; // 第 x 张sheet 中的数据

  if (!data) {
    warn("没有找到相应的excel数据");
  }
  return data!;
};
