"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";

export default function ExchangeCalculator() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("150");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("JPY");

  const converted = useMemo(() => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (!Number.isFinite(a) || !Number.isFinite(r)) return null;
    return a * r;
  }, [amount, rate]);

  function swap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    const r = parseFloat(rate);
    if (r) setRate(String(1 / r));
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <NumberField label={`金額(${fromCurrency})`} value={amount} onChange={setAmount} />
        <NumberField label={`為替レート(1 ${fromCurrency} = ? ${toCurrency})`} value={rate} onChange={setRate} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="tool-label">変換元通貨コード</label>
          <input type="text" className="tool-input" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value.toUpperCase())} />
        </div>
        <div>
          <label className="tool-label">変換先通貨コード</label>
          <input type="text" className="tool-input" value={toCurrency} onChange={(e) => setToCurrency(e.target.value.toUpperCase())} />
        </div>
      </div>
      <button type="button" className="btn-secondary" onClick={swap}>
        通貨を入れ替える
      </button>
      {converted !== null && (
        <div className="tool-panel text-center">
          <div className="text-3xl font-bold text-indigo-600">
            {converted.toLocaleString(undefined, { maximumFractionDigits: 4 })} {toCurrency}
          </div>
        </div>
      )}
      <p className="text-xs text-slate-400">
        ※ 為替レートは手動で入力してください(リアルタイムのレート取得は行いません)。
      </p>
    </div>
  );
}
