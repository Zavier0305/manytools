export interface TypingWord {
  kana: string;
  romaji: string;
}

export const TYPING_WORDS: TypingWord[] = [
  { kana: "ねこ", romaji: "neko" },
  { kana: "いぬ", romaji: "inu" },
  { kana: "さくら", romaji: "sakura" },
  { kana: "りんご", romaji: "ringo" },
  { kana: "がっこう", romaji: "gakkou" },
  { kana: "でんしゃ", romaji: "densha" },
  { kana: "ともだち", romaji: "tomodachi" },
  { kana: "つくえ", romaji: "tsukue" },
  { kana: "ひこうき", romaji: "hikouki" },
  { kana: "たいよう", romaji: "taiyou" },
  { kana: "きょう", romaji: "kyou" },
  { kana: "ゆき", romaji: "yuki" },
  { kana: "うみ", romaji: "umi" },
  { kana: "やま", romaji: "yama" },
  { kana: "でんわ", romaji: "denwa" },
  { kana: "こうえん", romaji: "kouen" },
  { kana: "おんがく", romaji: "ongaku" },
  { kana: "びょういん", romaji: "byouin" },
  { kana: "しんぶん", romaji: "shinbun" },
  { kana: "せんせい", romaji: "sensei" },
  { kana: "としょかん", romaji: "toshokan" },
  { kana: "れいぞうこ", romaji: "reizouko" },
  { kana: "つくる", romaji: "tsukuru" },
  { kana: "あるく", romaji: "aruku" },
  { kana: "たべる", romaji: "taberu" },
  { kana: "はしる", romaji: "hashiru" },
  { kana: "かんがえる", romaji: "kangaeru" },
  { kana: "べんきょう", romaji: "benkyou" },
  { kana: "しごと", romaji: "shigoto" },
  { kana: "りょこう", romaji: "ryokou" },
];

export function pickNextWord(previous: TypingWord | null): TypingWord {
  if (TYPING_WORDS.length === 1) return TYPING_WORDS[0];
  let candidate: TypingWord;
  do {
    candidate = TYPING_WORDS[Math.floor(Math.random() * TYPING_WORDS.length)];
  } while (previous && candidate.romaji === previous.romaji);
  return candidate;
}
