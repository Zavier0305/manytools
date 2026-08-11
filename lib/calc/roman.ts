const NUMERALS: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

export function toRoman(num: number): string {
  if (!Number.isInteger(num) || num < 1 || num > 3999) {
    throw new Error("1〜3999の整数を入力してください");
  }
  let n = num;
  let result = "";
  for (const [value, symbol] of NUMERALS) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }
  return result;
}

export function fromRoman(roman: string): number {
  const cleaned = roman.trim().toUpperCase();
  if (!/^[MDCLXVI]+$/.test(cleaned)) throw new Error("有効なローマ数字ではありません");
  const values: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < cleaned.length; i++) {
    const current = values[cleaned[i]];
    const next = values[cleaned[i + 1]];
    if (next && current < next) total -= current;
    else total += current;
  }
  if (toRoman(total) !== cleaned) throw new Error("有効なローマ数字ではありません");
  return total;
}
