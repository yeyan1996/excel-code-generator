"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_1 = require("./compiler");
exports.config = {
    target: "./example/index.vue",
    reg: /table>/g,
    template: compiler_1.excel(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n     <el-table-column\n        prop=\"", "\"\n        label=\"", "\"\n        width=\"180\">\n      </el-table-column>\n    "], ["\n     <el-table-column\n        prop=\"",
        "\"\n        label=\"",
        "\"\n        width=\"180\">\n      </el-table-column>\n    "])), {
        source: "./example/excel.xlsx",
        line: ["H", 1, 5]
    }, {
        source: "./example/excel.xlsx",
        line: ["I", 1, 5]
    })
};
var templateObject_1;
