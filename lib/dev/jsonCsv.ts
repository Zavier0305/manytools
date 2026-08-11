function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function escapeCsvField(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function jsonToCsv(jsonText: string): string {
  const data = JSON.parse(jsonText);
  if (!Array.isArray(data)) throw new Error("JSONはオブジェクトの配列である必要があります");
  const headers = Array.from(
    data.reduce((set: Set<string>, row) => {
      if (row && typeof row === "object") {
        Object.keys(row).forEach((k) => set.add(k));
      }
      return set;
    }, new Set<string>())
  );
  const lines = [headers.map(escapeCsvField).join(",")];
  for (const row of data) {
    lines.push(headers.map((h) => escapeCsvField(row?.[h])).join(","));
  }
  return lines.join("\n");
}

export function csvToJson(csvText: string): string {
  const lines = csvText.replace(/\r\n/g, "\n").split("\n").filter((l) => l.length > 0);
  if (lines.length === 0) return "[]";
  const headers = parseCsvLine(lines[0]);
  const result = lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = values[i] ?? ""));
    return obj;
  });
  return JSON.stringify(result, null, 2);
}
