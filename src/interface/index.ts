export interface Config {
  excelPath: string;
  sheet: number;
  reg: RegExp;
  options: Option[];
  template: string;
  targetPath: string;
}

export interface Option {
  as: string;
  line: [string, string];
  camelCase?: boolean;
}

export interface ExcelObj {
  [prop: string]: string[];
}
