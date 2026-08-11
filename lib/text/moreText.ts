export function normalizeForCompare(text: string): string {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

export function isPalindrome(text: string): boolean {
  const normalized = normalizeForCompare(text);
  if (!normalized) return false;
  return normalized === Array.from(normalized).reverse().join("");
}

export function areAnagrams(a: string, b: string): boolean {
  const na = Array.from(normalizeForCompare(a)).sort().join("");
  const nb = Array.from(normalizeForCompare(b)).sort().join("");
  return na.length > 0 && na === nb;
}

export function estimateReadingTimeMinutes(text: string): number {
  const jpChars = (text.match(/[぀-ヿ一-鿿]/g) ?? []).length;
  const otherWords = text
    .replace(/[぀-ヿ一-鿿]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = jpChars / 400 + otherWords / 200;
  return Math.max(minutes, otherWords || jpChars ? 0.1 : 0);
}

export function countSentences(text: string): number {
  const matches = text.match(/[^。.!?！？\n]+[。.!?！？]/g);
  return matches ? matches.length : text.trim() ? 1 : 0;
}

export function countParagraphs(text: string): number {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean).length;
}

export function stripHtmlTags(text: string): string {
  return text.replace(/<[^>]*>/g, "");
}

export function removePunctuation(text: string): string {
  return text.replace(/[!-/:-@[-`{-~。、！？「」『』・]/g, "");
}

export function removeDigits(text: string): string {
  return text.replace(/[0-9０-９]/g, "");
}

export function removeEmoji(text: string): string {
  return text.replace(
    /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{2700}-\u{27BF}️]/gu,
    ""
  );
}

const URL_REGEX = /\bhttps?:\/\/[^\s<>"']+/g;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

export function extractUrls(text: string): string[] {
  return Array.from(new Set(text.match(URL_REGEX) ?? []));
}

export function extractEmails(text: string): string[] {
  return Array.from(new Set(text.match(EMAIL_REGEX) ?? []));
}

const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.",
  H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.",
  O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-",
  V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
};
const MORSE_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

export function morseCode(input: string, mode: string): string {
  if (mode === "decode") {
    return input
      .trim()
      .split(/\s+\/\s+|\s{2,}/)
      .map((word) =>
        word
          .trim()
          .split(/\s+/)
          .map((code) => MORSE_REVERSE[code] ?? "")
          .join("")
      )
      .join(" ");
  }
  return input
    .toUpperCase()
    .split(/\s+/)
    .map((word) =>
      Array.from(word)
        .map((ch) => MORSE_MAP[ch] ?? "")
        .filter(Boolean)
        .join(" ")
    )
    .join(" / ");
}

const NATO_MAP: Record<string, string> = {
  A: "Alpha", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo", F: "Foxtrot",
  G: "Golf", H: "Hotel", I: "India", J: "Juliett", K: "Kilo", L: "Lima",
  M: "Mike", N: "November", O: "Oscar", P: "Papa", Q: "Quebec", R: "Romeo",
  S: "Sierra", T: "Tango", U: "Uniform", V: "Victor", W: "Whiskey",
  X: "Xray", Y: "Yankee", Z: "Zulu",
};
const NATO_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(NATO_MAP).map(([k, v]) => [v.toLowerCase(), k])
);

export function natoPhonetic(input: string, mode: string): string {
  if (mode === "decode") {
    return input
      .trim()
      .split(/\s+/)
      .map((w) => NATO_REVERSE[w.toLowerCase()] ?? w)
      .join("");
  }
  return Array.from(input.toUpperCase())
    .map((ch) => NATO_MAP[ch] ?? ch)
    .join(" ");
}

const LEET_MAP: Record<string, string> = {
  a: "4", e: "3", i: "1", o: "0", s: "5", t: "7", A: "4", E: "3", I: "1", O: "0", S: "5", T: "7",
};

export function toLeetspeak(text: string): string {
  return Array.from(text)
    .map((ch) => LEET_MAP[ch] ?? ch)
    .join("");
}

const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ",
  j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ",
  s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  "1": "1", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "5", "6": "9", "7": "ㄥ",
  "8": "8", "9": "6", "0": "0", ".": "˙", ",": "'", "?": "¿", "!": "¡",
};

export function toUpsideDown(text: string): string {
  return Array.from(text)
    .reverse()
    .map((ch) => UPSIDE_DOWN_MAP[ch.toLowerCase()] ?? ch)
    .join("");
}

export function visualizeWhitespace(text: string): string {
  return text.replace(/\t/g, "→").replace(/ /g, "·").replace(/\n/g, "¶\n");
}

export function convertTabsSpaces(text: string, mode: string, spaces = 4): string {
  if (mode === "spaces-to-tabs") {
    return text.replace(new RegExp(` {${spaces}}`, "g"), "\t");
  }
  return text.replace(/\t/g, " ".repeat(spaces));
}

export function padString(text: string, targetLength: number, padChar: string, side: string): string {
  const char = padChar || " ";
  return text
    .split("\n")
    .map((line) => {
      if (line.length >= targetLength) return line;
      const padLength = targetLength - line.length;
      const pad = char.repeat(Math.ceil(padLength / char.length)).slice(0, padLength);
      return side === "left" ? pad + line : side === "both"
        ? char.repeat(Math.floor(padLength / 2 / char.length)).slice(0, Math.floor(padLength / 2)) +
          line +
          char.repeat(Math.ceil(padLength / 2 / char.length)).slice(0, Math.ceil(padLength / 2))
        : line + pad;
    })
    .join("\n");
}

export function repeatText(text: string, times: number, separator: string): string {
  return Array.from({ length: Math.max(1, Math.min(1000, times)) }, () => text).join(separator);
}
