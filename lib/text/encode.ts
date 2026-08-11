export function utf8ToBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export function base64ToUtf8(input: string): string {
  const binary = atob(input.trim());
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function base64Tool(input: string, mode: string): string {
  if (mode === "decode") {
    try {
      return base64ToUtf8(input);
    } catch {
      throw new Error("有効なBase64文字列ではありません");
    }
  }
  return utf8ToBase64(input);
}

export function urlEncodeTool(input: string, mode: string): string {
  if (mode === "decode") {
    try {
      return decodeURIComponent(input);
    } catch {
      throw new Error("有効なURLエンコード文字列ではありません");
    }
  }
  return encodeURIComponent(input);
}

const HTML_ENTITY_MAP: [string, string][] = [
  ["&", "&amp;"],
  ["<", "&lt;"],
  [">", "&gt;"],
  ['"', "&quot;"],
  ["'", "&#39;"],
];

const NAMED_ENTITY_DECODE: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#39": "'",
  apos: "'",
  nbsp: " ",
};

export function htmlEntityTool(input: string, mode: string): string {
  if (mode === "decode") {
    return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
      if (entity[0] === "#") {
        const isHex = entity[1] === "x" || entity[1] === "X";
        const code = parseInt(isHex ? entity.slice(2) : entity.slice(1), isHex ? 16 : 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }
      return NAMED_ENTITY_DECODE[entity] ?? match;
    });
  }
  let result = input;
  for (const [char, entity] of HTML_ENTITY_MAP) {
    result = result.split(char).join(entity);
  }
  return result;
}

export function hexTool(input: string, mode: string): string {
  if (mode === "decode") {
    const cleaned = input.replace(/\s+/g, "");
    if (!/^[0-9a-fA-F]*$/.test(cleaned) || cleaned.length % 2 !== 0) {
      throw new Error("有効な16進数文字列ではありません");
    }
    const bytes = new Uint8Array(cleaned.length / 2);
    for (let i = 0; i < cleaned.length; i += 2) {
      bytes[i / 2] = parseInt(cleaned.slice(i, i + 2), 16);
    }
    return new TextDecoder().decode(bytes);
  }
  const bytes = new TextEncoder().encode(input);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
}

export function binaryTool(input: string, mode: string): string {
  if (mode === "decode") {
    const cleaned = input.trim().split(/\s+/).filter(Boolean);
    if (cleaned.some((chunk) => !/^[01]{1,8}$/.test(chunk))) {
      throw new Error("有効な2進数文字列ではありません(0と1、8桁区切り)");
    }
    const bytes = new Uint8Array(cleaned.map((chunk) => parseInt(chunk, 2)));
    return new TextDecoder().decode(bytes);
  }
  const bytes = new TextEncoder().encode(input);
  return Array.from(bytes)
    .map((b) => b.toString(2).padStart(8, "0"))
    .join(" ");
}

export function rot13(input: string): string {
  return input.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export function convertLineBreak(input: string, target: string): string {
  const normalized = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (target === "crlf") return normalized.replace(/\n/g, "\r\n");
  if (target === "cr") return normalized.replace(/\n/g, "\r");
  return normalized;
}
