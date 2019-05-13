export function warn(errMessage: string): void {
  console.error(errMessage);
  process.exit();
}
