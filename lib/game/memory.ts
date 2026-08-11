export interface MemoryCard {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

export const MEMORY_THEMES: Record<string, { name: string; emojis: string[] }> = {
  fruits: { name: "くだもの", emojis: ["🍎", "🍌", "🍇", "🍉", "🍒", "🍑", "🍍", "🥝"] },
  animals: { name: "どうぶつ", emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"] },
  flags: { name: "国旗", emojis: ["🇯🇵", "🇺🇸", "🇫🇷", "🇩🇪", "🇰🇷", "🇨🇳", "🇮🇹", "🇬🇧"] },
  vehicles: { name: "乗り物", emojis: ["🚗", "🚕", "🚌", "🚑", "🚒", "🚓", "🚜", "🚲"] },
  sports: { name: "スポーツ", emojis: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏓", "🏸"] },
  weather: { name: "天気", emojis: ["☀️", "🌧️", "⛄", "🌈", "⚡", "🌪️", "🌊", "❄️"] },
  space: { name: "宇宙", emojis: ["🌍", "🌙", "⭐", "☄️", "🪐", "🚀", "👽", "🛸"] },
  faces: { name: "表情", emojis: ["😀", "😂", "😍", "😎", "😭", "😱", "🥳", "🤔"] },
  instruments: { name: "楽器", emojis: ["🎸", "🎹", "🥁", "🎺", "🎻", "🪗", "🎷", "🪘"] },
  seaanimals: { name: "海の生き物", emojis: ["🐳", "🐬", "🐠", "🐙", "🦀", "🐡", "🦈", "🐢"] },
  insects: { name: "昆虫", emojis: ["🐝", "🦋", "🐞", "🕷️", "🦗", "🐜", "🦟", "🐛"] },
  birds: { name: "鳥", emojis: ["🐦", "🦅", "🦉", "🦆", "🐧", "🦜", "🦩", "🦢"] },
  desserts: { name: "デザート", emojis: ["🍰", "🍩", "🍪", "🍫", "🍦", "🍬", "🍭", "🧁"] },
  drinks: { name: "飲み物", emojis: ["☕", "🍵", "🧃", "🥤", "🍺", "🍷", "🧉", "🧋"] },
  tools: { name: "工具", emojis: ["🔨", "🔧", "🪛", "🪚", "🧰", "🔩", "⚙️", "🪜"] },
  clothes: { name: "衣類", emojis: ["👕", "👖", "👗", "👠", "👟", "🧢", "👜", "🧣"] },
  musicnotes: { name: "音楽記号", emojis: ["🎵", "🎶", "🎼", "🎤", "🎧", "🔔", "🎙️", "📯"] },
  plants: { name: "植物", emojis: ["🌸", "🌻", "🌹", "🌷", "🌵", "🌴", "🍀", "🌿"] },
  games: { name: "ゲーム", emojis: ["🎮", "🎲", "♟️", "🎯", "🃏", "🎳", "🧩", "🎰"] },
  zodiac: { name: "星座記号", emojis: ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏"] },
  weathericons: { name: "天気アイコン", emojis: ["⛅", "🌤️", "🌥️", "🌦️", "🌨️", "🌩️", "🌫️", "🌬️"] },
};

export function createShuffledCards(themeId = "fruits"): MemoryCard[] {
  const emojis = MEMORY_THEMES[themeId]?.emojis ?? MEMORY_THEMES.fruits.emojis;
  const pairs = [...emojis, ...emojis];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
}
