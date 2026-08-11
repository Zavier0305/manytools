export function csvEscapeTool(input: string, mode: string): string {
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  if (mode === "decode") {
    return lines
      .map((line) => {
        if (line.startsWith('"') && line.endsWith('"')) {
          return line.slice(1, -1).replace(/""/g, '"');
        }
        return line;
      })
      .join("\n");
  }
  return lines
    .map((line) => {
      if (/[",\n]/.test(line)) {
        return `"${line.replace(/"/g, '""')}"`;
      }
      return line;
    })
    .join("\n");
}
