"use client";

import { useMemo, useState } from "react";

export default function TileFlooringCalculator() {
  const [roomWidth, setRoomWidth] = useState("4");
  const [roomLength, setRoomLength] = useState("5");
  const [tileWidth, setTileWidth] = useState("30");
  const [tileLength, setTileLength] = useState("30");
  const [wastePercent, setWastePercent] = useState("10");

  const result = useMemo(() => {
    const rw = parseFloat(roomWidth);
    const rl = parseFloat(roomLength);
    const tw = parseFloat(tileWidth) / 100;
    const tl = parseFloat(tileLength) / 100;
    const waste = parseFloat(wastePercent) / 100;
    if (![rw, rl, tw, tl, waste].every(Number.isFinite) || tw <= 0 || tl <= 0) return null;
    const roomArea = rw * rl;
    const tileArea = tw * tl;
    const tilesNeeded = Math.ceil((roomArea / tileArea) * (1 + waste));
    return { roomArea, tilesNeeded };
  }, [roomWidth, roomLength, tileWidth, tileLength, wastePercent]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">部屋の幅(m)</label>
          <input type="number" className="tool-input" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">部屋の奥行き(m)</label>
          <input type="number" className="tool-input" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">タイルの幅(cm)</label>
          <input type="number" className="tool-input" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">タイルの奥行き(cm)</label>
          <input type="number" className="tool-input" value={tileLength} onChange={(e) => setTileLength(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="tool-label">余裕率(切断ロス分)</label>
        <input type="number" className="tool-input w-32" value={wastePercent} onChange={(e) => setWastePercent(e.target.value)} />
        <span className="ml-2 text-sm text-slate-500">%</span>
      </div>
      {result && (
        <div className="tool-panel space-y-2 text-center">
          <div className="text-sm text-slate-500">部屋の面積: {result.roomArea.toFixed(2)}m²</div>
          <div className="text-3xl font-bold text-indigo-600">{result.tilesNeeded}枚</div>
        </div>
      )}
    </div>
  );
}
