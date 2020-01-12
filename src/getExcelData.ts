import { pipe } from "lodash/fp";
import fs from "fs";
import xlsx from "node-xlsx";
import { config } from "./config";
import { warn } from "./utils";

const q = (path, sheet) => {
  const generateBuffer = pipe(
    fs.readFileSync,
    xlsx.parse
  );
  let workSheetsFromBuffer: {
    name: string;
    data: string[][];
  }[] = generateBuffer(config.excelPath);

  let { data = null } = workSheetsFromBuffer[config.sheet - 1] || {}; // 第 x 张sheet 中的数据

  if (!data) {
    warn("没有找到相应的excel数据");
  }
};
