"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

export default function WifiQrGenerator() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [hidden, setHidden] = useState(false);
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    if (!ssid) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDataUrl("");
      return;
    }
    const payload = `WIFI:T:${security};S:${escapeWifi(ssid)};${
      security === "nopass" ? "" : `P:${escapeWifi(password)};`
    }H:${hidden};;`;
    let cancelled = false;
    QRCode.toDataURL(payload, { width: 320, margin: 1 }).then((url) => {
      if (!cancelled) setDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [ssid, password, security, hidden]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">SSID(ネットワーク名)</label>
        <input type="text" className="tool-input" value={ssid} onChange={(e) => setSsid(e.target.value)} />
      </div>
      <div>
        <label className="tool-label">セキュリティ</label>
        <select
          className="tool-input"
          value={security}
          onChange={(e) => setSecurity(e.target.value as typeof security)}
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">パスワードなし</option>
        </select>
      </div>
      {security !== "nopass" && (
        <div>
          <label className="tool-label">パスワード</label>
          <input
            type="text"
            className="tool-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} />
        非公開(ステルス)ネットワーク
      </label>
      {dataUrl && (
        <div className="flex flex-col items-center gap-3 tool-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt="Wi-Fi QRコード" width={240} height={240} className="rounded-lg" />
          <a href={dataUrl} download="wifi-qrcode.png" className="btn-secondary">
            画像をダウンロード
          </a>
        </div>
      )}
    </div>
  );
}
