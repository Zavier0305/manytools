"use client";

import { useEffect, useState } from "react";
import { blackjackValue, cardLabel, createDeck, shuffleDeck, type PlayingCard } from "@/lib/game/cards";

export default function BlackjackGame() {
  const [deck, setDeck] = useState<PlayingCard[]>([]);
  const [playerCards, setPlayerCards] = useState<PlayingCard[]>([]);
  const [dealerCards, setDealerCards] = useState<PlayingCard[]>([]);
  const [status, setStatus] = useState<"playing" | "over">("playing");
  const [message, setMessage] = useState<string | null>(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  function deal() {
    const fresh = shuffleDeck(createDeck());
    setPlayerCards([fresh[0], fresh[2]]);
    setDealerCards([fresh[1], fresh[3]]);
    setDeck(fresh.slice(4));
    setStatus("playing");
    setMessage(null);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    deal();
  }, []);

  const playerValue = blackjackValue(playerCards);
  const dealerValue = blackjackValue(dealerCards);

  function hit() {
    if (status !== "playing") return;
    const card = deck[0];
    const nextPlayer = [...playerCards, card];
    setPlayerCards(nextPlayer);
    setDeck(deck.slice(1));
    if (blackjackValue(nextPlayer) > 21) {
      finish(nextPlayer, dealerCards);
    }
  }

  function stand() {
    if (status !== "playing") return;
    let currentDealer = [...dealerCards];
    let currentDeck = [...deck];
    while (blackjackValue(currentDealer) < 17) {
      currentDealer = [...currentDealer, currentDeck[0]];
      currentDeck = currentDeck.slice(1);
    }
    setDealerCards(currentDealer);
    setDeck(currentDeck);
    finish(playerCards, currentDealer);
  }

  function finish(player: PlayingCard[], dealer: PlayingCard[]) {
    const pv = blackjackValue(player);
    const dv = blackjackValue(dealer);
    setStatus("over");
    if (pv > 21) {
      setMessage("バースト!あなたの負けです");
      setLosses((l) => l + 1);
    } else if (dv > 21 || pv > dv) {
      setMessage("あなたの勝ちです!🎉");
      setWins((w) => w + 1);
    } else if (pv === dv) {
      setMessage("引き分けです");
    } else {
      setMessage("ディーラーの勝ちです");
      setLosses((l) => l + 1);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4 text-sm text-slate-500">
        <span>勝ち: {wins}</span>
        <span>負け: {losses}</span>
      </div>

      <div className="tool-panel space-y-2">
        <p className="text-sm text-slate-500">ディーラー ({status === "over" ? dealerValue : "?"})</p>
        <div className="flex gap-2 text-lg font-bold">
          {dealerCards.map((c, i) => (
            <span key={i} className="rounded border border-slate-300 px-2 py-1">
              {status === "over" || i === 0 ? cardLabel(c) : "??"}
            </span>
          ))}
        </div>
      </div>

      <div className="tool-panel space-y-2">
        <p className="text-sm text-slate-500">あなた ({playerValue})</p>
        <div className="flex gap-2 text-lg font-bold">
          {playerCards.map((c, i) => (
            <span key={i} className="rounded border border-slate-300 px-2 py-1">
              {cardLabel(c)}
            </span>
          ))}
        </div>
      </div>

      {message && <p className="text-center text-xl font-bold text-indigo-600">{message}</p>}

      <div className="flex justify-center gap-3">
        {status === "playing" ? (
          <>
            <button type="button" className="btn" onClick={hit}>
              ヒット
            </button>
            <button type="button" className="btn-secondary" onClick={stand}>
              スタンド
            </button>
          </>
        ) : (
          <button type="button" className="btn" onClick={deal}>
            もう一度
          </button>
        )}
      </div>
    </div>
  );
}
