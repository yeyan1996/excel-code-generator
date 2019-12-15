"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    excelPath: "./example/excel.xlsx",
    targetPath: "./example/index.vue",
    sheet: 1,
    reg: /table>/g,
    options: [
        {
            as: "name",
            line: ["H", "1-5"],
            camelCase: true // 是否需要转成驼峰
        },
        {
            as: "key",
            line: ["I", "1-5"]
        }
    ],
    template: "\n     <el-table-column\n        prop={{key}}\n        label={{name}}\n        width=\"180\">\n      </el-table-column>\n    "
};
