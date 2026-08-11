"use client";

import { useMemo, useState } from "react";
import { UNIT_CATEGORIES } from "@/lib/unit/units";

export default function UnitConverter({ config }: { config?: Record<string, unknown> }) {
  const categoryId = (config?.unit as string) ?? "length";
  const category = UNIT_CATEGORIES[categoryId];
  const units = category.units;

  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState(units[0].id);
  const [toUnit, setToUnit] = useState(units[1]?.id ?? units[0].id);

  const results = useMemo(() => {
    const v = parseFloat(value);
    if (!Number.isFinite(v)) return null;
    const from = units.find((u) => u.id === fromUnit)!;
    const baseValue = from.toBase(v);
    return units.map((u) => ({ id: u.id, label: u.label, value: u.fromBase(baseValue) }));
  }, [value, fromUnit, units]);

  const highlighted = results?.find((r) => r.id === toUnit);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="tool-label">値</label>
          <input type="number" className="tool-input" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">変換元の単位</label>
          <select className="tool-input" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {highlighted && (
        <div className="tool-panel text-center">
          <div className="text-sm text-slate-500">
            {value} {units.find((u) => u.id === fromUnit)?.label} =
          </div>
          <div className="mt-1 flex items-center justify-center gap-2">
            <select
              className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-2xl font-bold text-indigo-600"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-1 text-3xl font-bold text-indigo-600">
            {formatNumber(highlighted.value)}
          </div>
        </div>
      )}

      {results && (
        <div className="tool-panel overflow-x-auto p-0">
          <table className="w-full text-sm">
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 first:border-t-0">
                  <td className="px-4 py-2 text-slate-500">{r.label}</td>
                  <td className="px-4 py-2 text-right font-mono">{formatNumber(r.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "-";
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
}
