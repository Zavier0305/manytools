"use client";

import { useMemo, useState } from "react";

export default function HouseholdBudgetCalculator() {
  const [income, setIncome] = useState("300000");
  const [expenses, setExpenses] = useState("家賃,80000\n食費,40000\n光熱費,15000\n通信費,10000\n交際費,15000");

  const result = useMemo(() => {
    const inc = parseFloat(income);
    const rows = expenses
      .split("\n")
      .map((line) => {
        const [name, amount] = line.split(",");
        return { name: name?.trim(), amount: parseFloat(amount) };
      })
      .filter((r) => r.name && Number.isFinite(r.amount));
    if (!Number.isFinite(inc)) return null;
    const totalExpense = rows.reduce((sum, r) => sum + r.amount, 0);
    return { rows, totalExpense, balance: inc - totalExpense };
  }, [income, expenses]);

  return (
    <div className="space-y-4">
      <div>
        <label className="tool-label">月収</label>
        <input type="number" className="tool-input" value={income} onChange={(e) => setIncome(e.target.value)} />
      </div>
      <div>
        <label className="tool-label">支出(1行に「項目, 金額」)</label>
        <textarea className="tool-textarea font-mono" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
      </div>
      {result && (
        <div className="tool-panel space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">支出合計</span>
            <span>{Math.round(result.totalExpense).toLocaleString()}円</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span className={result.balance >= 0 ? "text-indigo-600" : "text-red-600"}>収支</span>
            <span className={result.balance >= 0 ? "text-indigo-600" : "text-red-600"}>
              {result.balance >= 0 ? "+" : ""}
              {Math.round(result.balance).toLocaleString()}円
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
