import { Option } from "./src/interface";

declare function gen(config: {
  template: string;
  target?: string;
  reg?: RegExp;
}): void;

declare function excel(strs: TemplateStringsArray, ...options: Option[]): void;

export { excel, gen };
