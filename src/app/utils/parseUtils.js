export function parseNumber(string) {
  return string.replace(/\D/, ".") * 1;
}

export function parseNumberNullable(string) {
  if (string === null || string === undefined) {
    return string;
  }
  return parseNumber(string);
}
