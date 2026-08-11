"use client";

import { useMemo, useState } from "react";

export default function DistanceCalculator() {
  const [x1, setX1] = useState("0");
  const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("3");
  const [y2, setY2] = useState("4");

  const distance = useMemo(() => {
    const values = [x1, y1, x2, y2].map(Number);
    if (!values.every(Number.isFinite)) return null;
    const [ax, ay, bx, by] = values;
    return Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);
  }, [x1, y1, x2, y2]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="tool-panel space-y-2">
          <h2 className="font-semibold text-slate-800">点A</h2>
          <div className="flex gap-2">
            <input type="number" className="tool-input" placeholder="x1" value={x1} onChange={(e) => setX1(e.target.value)} />
            <input type="number" className="tool-input" placeholder="y1" value={y1} onChange={(e) => setY1(e.target.value)} />
          </div>
        </div>
        <div className="tool-panel space-y-2">
          <h2 className="font-semibold text-slate-800">点B</h2>
          <div className="flex gap-2">
            <input type="number" className="tool-input" placeholder="x2" value={x2} onChange={(e) => setX2(e.target.value)} />
            <input type="number" className="tool-input" placeholder="y2" value={y2} onChange={(e) => setY2(e.target.value)} />
          </div>
        </div>
      </div>
      {distance !== null && (
        <div className="tool-panel text-center text-3xl font-bold text-indigo-600">{distance.toFixed(4)}</div>
      )}
    </div>
  );
}
