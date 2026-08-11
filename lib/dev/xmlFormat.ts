export function formatXml(input: string): string {
  const withBreaks = input
    .replace(/>\s*</g, "><")
    .replace(/></g, ">\n<")
    .trim();
  const lines = withBreaks.split("\n");
  let indent = 0;
  const result: string[] = [];
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    const isClosing = /^<\/.+>$/.test(line);
    const isSelfClosing = /\/>$/.test(line) || /^<\?.*\?>$/.test(line) || /^<!--.*-->$/.test(line);
    const isOpeningAndClosing = /^<([a-zA-Z0-9:_-]+)[^>]*>.*<\/\1>$/.test(line);

    if (isClosing) indent = Math.max(0, indent - 1);
    result.push("  ".repeat(indent) + line);
    if (!isClosing && !isSelfClosing && !isOpeningAndClosing && /^<[a-zA-Z]/.test(line)) {
      indent++;
    }
  }
  return result.join("\n");
}
