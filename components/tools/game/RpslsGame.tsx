"use client";

import { useState } from "react";

const HANDS = [
  { id: "rock", label: "グー", emoji: "✊", beats: ["scissors", "lizard"] },
  { id: "paper", label: "パー", emoji: "🖐️", beats: ["rock", "spock"] },
  { id: "scissors", label: "チョキ", emoji: "✌️", beats: ["paper", "lizard"] },
  { id: "lizard", label: "トカゲ", emoji: "🦎", beats: ["spock", "paper"] },
  { id: "spock", label: "スポック", emoji: "🖖", beats: ["scissors", "rock"] },
] as const;

type HandId = (typeof HANDS)[number]["id"];

function judge(player: HandId, cpu: HandId): "win" | "lose" | "draw" {
  if (player === cpu) return "draw";
  const playerHand = HANDS.find((h) => h.id === player)!;
  return (playerHand.beats as readonly string[]).includes(cpu) ? "win" : "lose";
}

function pickRandomHand(): HandId {
  return HANDS[Math.floor(Math.random() * HANDS.length)].id;
}

export default function RpslsGame() {
  const [playerHand, setPlayerHand] = useState<HandId | null>(null);
  const [cpuHand, setCpuHand] = useState<HandId | null>(null);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  function play(hand: HandId) {
    const cpu = pickRandomHand();
    const outcome = judge(hand, cpu);
    setPlayerHand(hand);
    setCpuHand(cpu);
    setResult(outcome);
    setScore((prev) => ({ ...prev, [outcome]: prev[outcome] + 1 }));
  }

  const resultLabel = { win: "あなたの勝ち!", lose: "あなたの負け...", draw: "あいこ" };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-3">
        {HANDS.map((h) => (
          <button key={h.id} type="button" onClick={() => play(h.id)} className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-3xl shadow-sm hover:border-indigo-300">
            <span>{h.emoji}</span>
            <span className="text-xs text-slate-500">{h.label}</span>
          </button>
        ))}
      </div>
      {playerHand && cpuHand && result && (
        <div className="tool-panel text-center">
          <div className="flex items-center justify-center gap-6 text-5xl">
            <span>{HANDS.find((h) => h.id === playerHand)?.emoji}</span>
            <span className="text-xl text-slate-400">VS</span>
            <span>{HANDS.find((h) => h.id === cpuHand)?.emoji}</span>
          </div>
          <div className="mt-3 text-xl font-bold text-indigo-600">{resultLabel[result]}</div>
        </div>
      )}
      <div className="flex justify-center gap-6 text-sm text-slate-500">
        <span>勝ち: {score.win}</span>
        <span>負け: {score.lose}</span>
        <span>あいこ: {score.draw}</span>
      </div>
    </div>
  );
}
