export function toHalfWidth(input: string): string {
  return input
    .replace(/[！-～]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
    )
    .replace(/　/g, " ");
}

export function toFullWidth(input: string): string {
  return input
    .replace(/[!-~]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) + 0xfee0)
    )
    .replace(/ /g, "　");
}
