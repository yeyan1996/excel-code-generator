const { gen, excel } = require("../dist/main");

gen({
  target: "./example/index.vue",
  reg: /table>/g,
  template: excel`
     <el-table-column
        prop="${{
          source: "./example/excel.xlsx",
          line: ["H", 1, 5]
        }}"
        label="${{
          source: "./example/excel.xlsx",
          line: ["I", 1, 5]
        }}"
        width="180">
      </el-table-column>
    `
});
