export function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) throw new Error("0以上の整数を入力してください");
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export function permutations(n: number, r: number): number {
  if (r > n || r < 0 || n < 0) return 0;
  let result = 1;
  for (let i = 0; i < r; i++) result *= n - i;
  return result;
}

export function combinations(n: number, r: number): number {
  if (r > n || r < 0 || n < 0) return 0;
  return permutations(n, r) / factorial(r);
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function gcdLcmOfList(numbers: number[]): { gcd: number; lcm: number } {
  if (numbers.length === 0) return { gcd: 0, lcm: 0 };
  return {
    gcd: numbers.reduce((acc, n) => gcd(acc, n)),
    lcm: numbers.reduce((acc, n) => lcm(acc, n)),
  };
}

export function primeFactorize(n: number): { prime: number; exponent: number }[] {
  let num = Math.abs(Math.trunc(n));
  const factors: { prime: number; exponent: number }[] = [];
  for (let p = 2; p * p <= num; p++) {
    let exponent = 0;
    while (num % p === 0) {
      num /= p;
      exponent++;
    }
    if (exponent > 0) factors.push({ prime: p, exponent });
  }
  if (num > 1) factors.push({ prime: num, exponent: 1 });
  return factors;
}

export function reduceFraction(num: number, den: number): [number, number] {
  if (den === 0) throw new Error("分母を0にすることはできません");
  const sign = den < 0 ? -1 : 1;
  const g = gcd(num, den) || 1;
  return [(sign * num) / g, (sign * den) / g];
}

export function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function variance(values: number[]): number {
  const m = mean(values);
  return mean(values.map((v) => (v - m) ** 2));
}

export function stddev(values: number[]): number {
  return Math.sqrt(variance(values));
}
