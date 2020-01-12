export interface Config {
  reg?: RegExp;
  template: string;
  target?: string;
}

export interface Option {
  line: [string, number, number];
  source: string;
  sheet?: number;
  camelcase?: boolean;
}
