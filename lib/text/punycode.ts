// Compact RFC 3492 Punycode implementation.
const BASE = 36;
const T_MIN = 1;
const T_MAX = 26;
const SKEW = 38;
const DAMP = 700;
const INITIAL_BIAS = 72;
const INITIAL_N = 128;
const DELIMITER = "-";

function adapt(delta: number, numPoints: number, firstTime: boolean): number {
  let d = firstTime ? Math.floor(delta / DAMP) : Math.floor(delta / 2);
  d += Math.floor(d / numPoints);
  let k = 0;
  while (d > ((BASE - T_MIN) * T_MAX) / 2) {
    d = Math.floor(d / (BASE - T_MIN));
    k += BASE;
  }
  return k + Math.floor(((BASE - T_MIN + 1) * d) / (d + SKEW));
}

function digitToBasic(digit: number): string {
  return String.fromCharCode(digit + (digit < 26 ? 97 : 22));
}

function basicToDigit(codePoint: number): number {
  if (codePoint >= 48 && codePoint <= 57) return codePoint - 22;
  if (codePoint >= 65 && codePoint <= 90) return codePoint - 65;
  if (codePoint >= 97 && codePoint <= 122) return codePoint - 97;
  return BASE;
}

function encodeLabel(input: string): string {
  const output: string[] = [];
  const codePoints = Array.from(input).map((ch) => ch.codePointAt(0)!);
  const basic = codePoints.filter((c) => c < 0x80);
  basic.forEach((c) => output.push(String.fromCharCode(c)));

  let handled = basic.length;
  const total = codePoints.length;
  if (basic.length > 0) output.push(DELIMITER);
  if (handled === total) return output.join("");

  let n = INITIAL_N;
  let delta = 0;
  let bias = INITIAL_BIAS;

  while (handled < total) {
    let minCodePoint = Infinity;
    for (const c of codePoints) {
      if (c >= n && c < minCodePoint) minCodePoint = c;
    }
    delta += (minCodePoint - n) * (handled + 1);
    n = minCodePoint;

    for (const c of codePoints) {
      if (c < n) delta++;
      if (c === n) {
        let q = delta;
        for (let k = BASE; ; k += BASE) {
          const t = k <= bias ? T_MIN : k >= bias + T_MAX ? T_MAX : k - bias;
          if (q < t) break;
          output.push(digitToBasic(t + ((q - t) % (BASE - t))));
          q = Math.floor((q - t) / (BASE - t));
        }
        output.push(digitToBasic(q));
        bias = adapt(delta, handled + 1, handled === basic.length);
        delta = 0;
        handled++;
      }
    }
    delta++;
    n++;
  }
  return output.join("");
}

function decodeLabel(input: string): string {
  const lastDelim = input.lastIndexOf(DELIMITER);
  const basic = lastDelim >= 0 ? input.slice(0, lastDelim) : "";
  const output: number[] = basic.length ? Array.from(basic).map((c) => c.charCodeAt(0)) : [];
  let i = 0;
  let n = INITIAL_N;
  let bias = INITIAL_BIAS;
  const rest = lastDelim >= 0 ? input.slice(lastDelim + 1) : input;

  let pos = 0;
  while (pos < rest.length) {
    const oldi = i;
    let w = 1;
    for (let k = BASE; ; k += BASE) {
      if (pos >= rest.length) throw new Error("不正なPunycode文字列です");
      const digit = basicToDigit(rest.charCodeAt(pos++));
      if (digit >= BASE) throw new Error("不正なPunycode文字列です");
      i += digit * w;
      const t = k <= bias ? T_MIN : k >= bias + T_MAX ? T_MAX : k - bias;
      if (digit < t) break;
      w *= BASE - t;
    }
    bias = adapt(i - oldi, output.length + 1, oldi === 0);
    n += Math.floor(i / (output.length + 1));
    i %= output.length + 1;
    output.splice(i, 0, n);
    i++;
  }
  return output.map((c) => String.fromCodePoint(c)).join("");
}

export function punycodeTool(input: string, mode: string): string {
  const labels = input.trim().split(".");
  if (mode === "decode") {
    return labels
      .map((label) => (label.toLowerCase().startsWith("xn--") ? decodeLabel(label.slice(4)) : label))
      .join(".");
  }
  return labels
    .map((label) => (/[^\x00-\x7F]/.test(label) ? "xn--" + encodeLabel(label) : label))
    .join(".");
}
