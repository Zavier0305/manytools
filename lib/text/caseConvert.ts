export function splitWords(str: string): string[] {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export type CaseMode =
  | "upper"
  | "lower"
  | "title"
  | "camel"
  | "snake"
  | "kebab"
  | "pascal"
  | "alternating"
  | "inverse"
  | "sentence"
  | "constant"
  | "train";

export function convertCase(input: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return input.toUpperCase();
    case "lower":
      return input.toLowerCase();
    case "title":
      return splitWords(input).map(capitalize).join(" ");
    case "camel": {
      const words = splitWords(input);
      return words
        .map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w)))
        .join("");
    }
    case "pascal":
      return splitWords(input).map(capitalize).join("");
    case "snake":
      return splitWords(input)
        .map((w) => w.toLowerCase())
        .join("_");
    case "kebab":
      return splitWords(input)
        .map((w) => w.toLowerCase())
        .join("-");
    case "constant":
      return splitWords(input)
        .map((w) => w.toUpperCase())
        .join("_");
    case "train":
      return splitWords(input).map(capitalize).join("-");
    case "alternating":
      return Array.from(input)
        .map((ch, i) => (i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()))
        .join("");
    case "inverse":
      return Array.from(input)
        .map((ch) => (ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()))
        .join("");
    case "sentence": {
      const lower = input.toLowerCase();
      return lower.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (m) => m.toUpperCase());
    }
    default:
      return input;
  }
}
