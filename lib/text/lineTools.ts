export function sortLines(input: string, mode: string): string {
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const sorted = [...lines];
  switch (mode) {
    case "asc":
      sorted.sort((a, b) => a.localeCompare(b, "ja"));
      break;
    case "desc":
      sorted.sort((a, b) => b.localeCompare(a, "ja"));
      break;
    case "length":
      sorted.sort((a, b) => a.length - b.length);
      break;
    case "random":
      for (let i = sorted.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
      }
      break;
  }
  return sorted.join("\n");
}

export function dedupLines(input: string): string {
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const seen = new Set<string>();
  const result: string[] = [];
  for (const line of lines) {
    if (!seen.has(line)) {
      seen.add(line);
      result.push(line);
    }
  }
  return result.join("\n");
}

export function numberLines(input: string): string {
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const width = String(lines.length).length;
  return lines
    .map((line, i) => `${String(i + 1).padStart(width, " ")}: ${line}`)
    .join("\n");
}

export function reverseText(input: string, mode: string): string {
  if (mode === "words") {
    return input.split(/\s+/).filter(Boolean).reverse().join(" ");
  }
  return Array.from(input).reverse().join("");
}

export function cleanupWhitespace(
  input: string,
  options: { trimLines: boolean; collapseSpaces: boolean; removeBlankLines: boolean }
): string {
  let lines = input.replace(/\r\n/g, "\n").split("\n");
  if (options.trimLines) {
    lines = lines.map((l) => l.trim());
  }
  if (options.collapseSpaces) {
    lines = lines.map((l) => l.replace(/[ \t]+/g, " "));
  }
  if (options.removeBlankLines) {
    lines = lines.filter((l) => l.trim() !== "");
  }
  return lines.join("\n");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .replace(/[^a-z0-9぀-ヿ一-鿿]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function charFrequency(input: string): { char: string; count: number; percent: string }[] {
  const counts = new Map<string, number>();
  for (const ch of Array.from(input)) {
    if (ch === "\n") continue;
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([char, count]) => ({
      char,
      count,
      percent: total ? ((count / total) * 100).toFixed(1) : "0.0",
    }));
}
