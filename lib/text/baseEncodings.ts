const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Tool(input: string, mode: string): string {
  if (mode === "decode") {
    const cleaned = input.trim().toUpperCase().replace(/=+$/, "");
    let bits = "";
    for (const ch of cleaned) {
      const index = BASE32_ALPHABET.indexOf(ch);
      if (index === -1) throw new Error("有効なBase32文字列ではありません");
      bits += index.toString(2).padStart(5, "0");
    }
    const bytes: number[] = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
      bytes.push(parseInt(bits.slice(i, i + 8), 2));
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  }
  const bytes = new TextEncoder().encode(input);
  let bits = "";
  bytes.forEach((b) => (bits += b.toString(2).padStart(8, "0")));
  let output = "";
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.slice(i, i + 5).padEnd(5, "0");
    output += BASE32_ALPHABET[parseInt(chunk, 2)];
  }
  while (output.length % 8 !== 0) output += "=";
  return output;
}

const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export function base58Tool(input: string, mode: string): string {
  if (mode === "decode") {
    const cleaned = input.trim();
    if (!cleaned) return "";
    let num = 0n;
    for (const ch of cleaned) {
      const index = BASE58_ALPHABET.indexOf(ch);
      if (index === -1) throw new Error("有効なBase58文字列ではありません");
      num = num * 58n + BigInt(index);
    }
    let hex = num.toString(16);
    if (hex.length % 2 !== 0) hex = "0" + hex;
    const bytes = hex.match(/.{1,2}/g)?.map((h) => parseInt(h, 16)) ?? [];
    const leadingOnes = cleaned.match(/^1*/)?.[0].length ?? 0;
    const result = [...Array(leadingOnes).fill(0), ...bytes];
    return new TextDecoder().decode(new Uint8Array(result));
  }
  const bytes = new TextEncoder().encode(input);
  let num = 0n;
  for (const b of bytes) num = num * 256n + BigInt(b);
  let output = "";
  while (num > 0n) {
    const rem = num % 58n;
    output = BASE58_ALPHABET[Number(rem)] + output;
    num /= 58n;
  }
  const leadingZeros = bytes.findIndex((b) => b !== 0);
  const zeroCount = leadingZeros === -1 ? bytes.length : leadingZeros;
  return "1".repeat(zeroCount) + output;
}

export function base85Tool(input: string, mode: string): string {
  if (mode === "decode") {
    const cleaned = input.trim().replace(/z/g, "!!!!!");
    const bytes: number[] = [];
    for (let i = 0; i < cleaned.length; i += 5) {
      const chunk = cleaned.slice(i, i + 5).padEnd(5, "u");
      let value = 0;
      for (const ch of chunk) {
        const code = ch.charCodeAt(0) - 33;
        if (code < 0 || code > 84) throw new Error("有効なBase85文字列ではありません");
        value = value * 85 + code;
      }
      const chunkBytes = [
        (value >>> 24) & 0xff,
        (value >>> 16) & 0xff,
        (value >>> 8) & 0xff,
        value & 0xff,
      ];
      const validBytes = Math.min(4, cleaned.slice(i, i + 5).length - 1);
      bytes.push(...chunkBytes.slice(0, validBytes));
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  }
  const bytes = new TextEncoder().encode(input);
  let output = "";
  for (let i = 0; i < bytes.length; i += 4) {
    const chunk = bytes.slice(i, i + 4);
    const padded = new Uint8Array(4);
    padded.set(chunk);
    const value = (padded[0] << 24) | (padded[1] << 16) | (padded[2] << 8) | padded[3];
    const unsigned = value >>> 0;
    if (unsigned === 0 && chunk.length === 4) {
      output += "z";
      continue;
    }
    let chars = "";
    let n = unsigned;
    for (let j = 0; j < 5; j++) {
      chars = String.fromCharCode((n % 85) + 33) + chars;
      n = Math.floor(n / 85);
    }
    output += chars.slice(0, chunk.length + 1);
  }
  return output;
}

export function caesarCipher(input: string, shift: number): string {
  const n = ((shift % 26) + 26) % 26;
  return input.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + n) % 26) + base);
  });
}

export function vigenereCipher(input: string, key: string, mode: string): string {
  const cleanKey = key.replace(/[^a-zA-Z]/g, "");
  if (!cleanKey) throw new Error("英字のキーを入力してください");
  let keyIndex = 0;
  return input.replace(/[a-zA-Z]/g, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    const keyChar = cleanKey[keyIndex % cleanKey.length].toUpperCase();
    const shift = keyChar.charCodeAt(0) - 65;
    keyIndex++;
    const effectiveShift = mode === "decode" ? -shift : shift;
    return String.fromCharCode(((ch.charCodeAt(0) - base + effectiveShift + 26) % 26) + base);
  });
}
