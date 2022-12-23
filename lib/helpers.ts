export function getLastNumber(url: string) {
  let string = url.substring(0, url.length - 1);
  const arr = string.split("/");
  return arr[arr.length - 1];
}
