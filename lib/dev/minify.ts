export function minifyCss(input: string): string {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

export function minifyHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// A lightweight, string/regex-aware comment & whitespace stripper.
// Not a full JS parser: safe for typical code but not guaranteed for every edge case.
export function minifyJs(input: string): string {
  let result = "";
  let i = 0;
  const n = input.length;
  while (i < n) {
    const ch = input[i];
    const next = input[i + 1];

    if (ch === "/" && next === "/") {
      while (i < n && input[i] !== "\n") i++;
      continue;
    }
    if (ch === "/" && next === "*") {
      i += 2;
      while (i < n && !(input[i] === "*" && input[i + 1] === "/")) i++;
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      result += ch;
      i++;
      while (i < n && input[i] !== quote) {
        if (input[i] === "\\") {
          result += input[i] + (input[i + 1] ?? "");
          i += 2;
          continue;
        }
        result += input[i];
        i++;
      }
      result += input[i] ?? "";
      i++;
      continue;
    }
    result += ch;
    i++;
  }
  return result
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n")
    .replace(/[ \t]{2,}/g, " ");
}
