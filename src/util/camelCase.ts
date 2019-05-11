export function camelCase(str: string): string {
  return str.replace(/_(\w)/g, function(match: string): string {
    return match.slice(1, 2).toUpperCase();
  });
}
