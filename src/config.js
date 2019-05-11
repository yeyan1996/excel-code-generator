"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    excelPath: "C:/Users/zhl/Desktop/excel.xlsm",
    targetPath: "C:/Users/zhl/Desktop/test.vue",
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
    template: "\n        {\n             attrs: {label: {{ name }}, prop: {{ key }}, width: '150'},\n        },\n    "
};
