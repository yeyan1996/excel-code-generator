export interface Config {
  excelPath: string;
  sheet: number;
  reg: RegExp;
  options: Option[];
  template: string;
  targetPath: TargetPath | string;
}

export interface NormalizedConfig {
  excelPath: string;
  sheet: number;
  reg: RegExp;
  options: Option[];
  template: string;
  targetPath: TargetPath;
}

export interface TargetPath {
  readPath: string;
  writePath: string;
}

export interface Option {
  as: string;
  line: [string, string];
  camelCase?: boolean;
}

export interface ExcelObj {
  [prop: string]: string[];
}
