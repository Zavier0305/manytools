"use client";

import { useMemo, useState } from "react";

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

export default function CsvTablePreview() {
  const [input, setInput] = useState("name,age,city\nAlice,30,Tokyo\nBob,25,Osaka");

  const { headers, rows } = useMemo(() => {
    const lines = input.replace(/\r\n/g, "\n").split("\n").filter(Boolean);
    if (lines.length === 0) return { headers: [], rows: [] };
    return {
      headers: parseCsvLine(lines[0]),
      rows: lines.slice(1).map(parseCsvLine),
    };
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">CSV</label>
        <textarea className="tool-textarea min-h-[8rem] font-mono" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {headers.length > 0 && (
        <div className="tool-panel overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="whitespace-nowrap px-4 py-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-slate-100">
                  {row.map((cell, j) => (
                    <td key={j} className="whitespace-nowrap px-4 py-1.5">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
