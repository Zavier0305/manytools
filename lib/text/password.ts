const CHAR_SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}",
};

const AMBIGUOUS = "il1Lo0O";

export interface PasswordOptions {
  length: number;
  lower: boolean;
  upper: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export function generatePassword(options: PasswordOptions): string {
  let pool = "";
  if (options.lower) pool += CHAR_SETS.lower;
  if (options.upper) pool += CHAR_SETS.upper;
  if (options.numbers) pool += CHAR_SETS.numbers;
  if (options.symbols) pool += CHAR_SETS.symbols;
  if (options.excludeAmbiguous) {
    pool = Array.from(pool)
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }
  if (!pool) return "";
  const randomValues = new Uint32Array(options.length);
  crypto.getRandomValues(randomValues);
  return Array.from(randomValues, (v) => pool[v % pool.length]).join("");
}

export function estimatePasswordStrength(password: string): {
  score: number;
  label: string;
} {
  if (!password) return { score: 0, label: "" };
  let variety = 0;
  if (/[a-z]/.test(password)) variety++;
  if (/[A-Z]/.test(password)) variety++;
  if (/[0-9]/.test(password)) variety++;
  if (/[^a-zA-Z0-9]/.test(password)) variety++;
  const entropy = password.length * Math.log2(Math.max(variety, 1) * 20);
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (variety >= 3) score++;
  if (variety >= 4 && password.length >= 12) score++;
  const labels = ["非常に弱い", "弱い", "普通", "強い", "非常に強い"];
  return { score, label: labels[Math.min(score, labels.length - 1)] + `(推定エントロピー約${Math.round(entropy)}bit)` };
}
