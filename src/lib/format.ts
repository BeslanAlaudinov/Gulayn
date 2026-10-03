/** 12345 → «12 345 ₽» с неразрывными пробелами. */
export function rub(n: number) {
  return `${n.toLocaleString("ru-RU").replace(/\s/g, " ")} ₽`;
}

/** 43000 → «43 000» с неразрывным пробелом. */
export function num(n: number) {
  return n.toLocaleString("ru-RU").replace(/\s/g, " ");
}

/** Неразрывные пробелы внутри готовой строки вроде «1 000». */
export function nb(s: string) {
  return s.replace(/ /g, " ");
}
