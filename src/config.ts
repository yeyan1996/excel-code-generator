import { Config } from "./interface";

export const config: Config = {
  excelPath: "C:/Users/zhl/Desktop/excel.xlsm",
  targetPath: "C:/Users/zhl/Desktop/test.vue",
  sheet: 1,
  reg: /columns([^\[]+\[)+/g,
  options: [
    {
      as: "name",
      line: ["H", "1-5"], //第1个参数为第x列(excel表格的列数的英文字母),第2个参数为第x到y行
      camelCase: true // 是否需要转成驼峰
    },
    {
      as: "key",
      line: ["I", "1-5"]
    }
  ],
  template: `
        {
             attrs: {label: {{ name }}, prop: {{ key }}, width: '150'},
        },
    `
};
