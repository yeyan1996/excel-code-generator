"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    excelPath: "./example/excel.xlsx",
    targetPath: "./example/test.js",
    sheet: 1,
    reg: /columns([^\[]+\[)+/g,
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
    template: "\n  {\n    attrs: {\n      label: {{ name }}, \n      prop: {{ key }}, \n      width: '150',\n      index: {{ _index }}\n    }\n  },\n    "
};
