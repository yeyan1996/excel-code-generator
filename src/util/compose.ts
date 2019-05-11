export function compose(...fns: Function[]): Function {
  return function(arg: any): any {
    return fns.reduceRight((pre: Function, cur: Function): any => {
      return cur(pre);
    }, arg);
  };
}
