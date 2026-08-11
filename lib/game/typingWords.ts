export interface TypingWord {
  kana: string;
  romaji: string;
}

export const TYPING_WORD_SETS: Record<string, TypingWord[]> = {
  hiragana: [
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
  ],
  katakana: [
    { kana: "コンピューター", romaji: "konpyu-ta-" },
    { kana: "インターネット", romaji: "inta-netto" },
    { kana: "レストラン", romaji: "resutoran" },
    { kana: "テレビ", romaji: "terebi" },
    { kana: "カメラ", romaji: "kamera" },
    { kana: "ホテル", romaji: "hoteru" },
    { kana: "タクシー", romaji: "takushi-" },
    { kana: "コーヒー", romaji: "ko-hi-" },
    { kana: "サッカー", romaji: "sakka-" },
    { kana: "アイスクリーム", romaji: "aisukuri-mu" },
    { kana: "スマートフォン", romaji: "suma-tofon" },
    { kana: "エレベーター", romaji: "erebe-ta-" },
  ],
  english: [
    { kana: "apple", romaji: "apple" },
    { kana: "banana", romaji: "banana" },
    { kana: "computer", romaji: "computer" },
    { kana: "keyboard", romaji: "keyboard" },
    { kana: "language", romaji: "language" },
    { kana: "mountain", romaji: "mountain" },
    { kana: "notebook", romaji: "notebook" },
    { kana: "sunshine", romaji: "sunshine" },
    { kana: "umbrella", romaji: "umbrella" },
    { kana: "vacation", romaji: "vacation" },
    { kana: "wonderful", romaji: "wonderful" },
    { kana: "xylophone", romaji: "xylophone" },
  ],
  proverbs: [
    { kana: "いしのうえにもさんねん", romaji: "ishinouenimosannen" },
    { kana: "さるもきからおちる", romaji: "sarumokikaraochiru" },
    { kana: "ちりもつもればやまとなる", romaji: "chirimotsumorebayamatonaru" },
    { kana: "ぜんはいそげ", romaji: "zenhaisoge" },
    { kana: "なんくるないさ", romaji: "nankurunaisa" },
    { kana: "はなよりだんご", romaji: "hanayoridango" },
    { kana: "うそからでたまこと", romaji: "usokaradetamakoto" },
    { kana: "いぬもあるけばぼうにあたる", romaji: "inumoarukebabouniataru" },
  ],
  "it-terms": [
    { kana: "ぷろぐらむ", romaji: "programu" },
    { kana: "でーたべーす", romaji: "de-tabe-su" },
    { kana: "あるごりずむ", romaji: "arugorizumu" },
    { kana: "せきゅりてぃ", romaji: "sekyuriti" },
    { kana: "くらうど", romaji: "kuraudo" },
    { kana: "さーばー", romaji: "sa-ba-" },
    { kana: "ねっとわーく", romaji: "nettowa-ku" },
    { kana: "あぷりけーしょん", romaji: "apurike-shon" },
  ],
  prefectures: [
    { kana: "ほっかいどう", romaji: "hokkaidou" },
    { kana: "あおもりけん", romaji: "aomoriken" },
    { kana: "とうきょうと", romaji: "toukyouto" },
    { kana: "かながわけん", romaji: "kanagawaken" },
    { kana: "おおさかふ", romaji: "oosakafu" },
    { kana: "きょうとふ", romaji: "kyoutofu" },
    { kana: "ふくおかけん", romaji: "fukuokaken" },
    { kana: "おきなわけん", romaji: "okinawaken" },
    { kana: "あいちけん", romaji: "aichiken" },
    { kana: "ひろしまけん", romaji: "hiroshimaken" },
  ],
  countries: [
    { kana: "にほん", romaji: "nihon" },
    { kana: "あめりか", romaji: "amerika" },
    { kana: "ふらんす", romaji: "furansu" },
    { kana: "どいつ", romaji: "doitsu" },
    { kana: "かんこく", romaji: "kankoku" },
    { kana: "ちゅうごく", romaji: "chuugoku" },
    { kana: "いたりあ", romaji: "itaria" },
    { kana: "すぺいん", romaji: "supein" },
    { kana: "たい", romaji: "tai" },
    { kana: "いんど", romaji: "indo" },
  ],
  animals: [
    { kana: "ぞう", romaji: "zou" },
    { kana: "きりん", romaji: "kirin" },
    { kana: "らいおん", romaji: "raion" },
    { kana: "とら", romaji: "tora" },
    { kana: "ぱんだ", romaji: "panda" },
    { kana: "うさぎ", romaji: "usagi" },
    { kana: "かんがるー", romaji: "kangaru-" },
    { kana: "ぺんぎん", romaji: "pengin" },
    { kana: "いるか", romaji: "iruka" },
    { kana: "くじら", romaji: "kujira" },
  ],
  food: [
    { kana: "すし", romaji: "sushi" },
    { kana: "らーめん", romaji: "ra-men" },
    { kana: "てんぷら", romaji: "tenpura" },
    { kana: "やきにく", romaji: "yakiniku" },
    { kana: "おにぎり", romaji: "onigiri" },
    { kana: "たこやき", romaji: "takoyaki" },
    { kana: "かれーらいす", romaji: "kare-raisu" },
    { kana: "おでん", romaji: "oden" },
    { kana: "うどん", romaji: "udon" },
    { kana: "そば", romaji: "soba" },
  ],
  idioms: [
    { kana: "いっせきにちょう", romaji: "issekinichou" },
    { kana: "おんこちしん", romaji: "onkochishin" },
    { kana: "りんきおうへん", romaji: "rinkiouhen" },
    { kana: "しめんそか", romaji: "shimensoka" },
    { kana: "ゆうげんじっこう", romaji: "yuugenjikkou" },
    { kana: "きしかいせい", romaji: "kishikaisei" },
    { kana: "がでんいんすい", romaji: "gadeninsui" },
    { kana: "じがじさん", romaji: "jigajisan" },
  ],
};

export const TYPING_WORD_SET_IDS = Object.keys(TYPING_WORD_SETS);

export function pickNextWord(previous: TypingWord | null, setId = "hiragana"): TypingWord {
  const words = TYPING_WORD_SETS[setId] ?? TYPING_WORD_SETS.hiragana;
  if (words.length === 1) return words[0];
  let candidate: TypingWord;
  do {
    candidate = words[Math.floor(Math.random() * words.length)];
  } while (previous && candidate.romaji === previous.romaji);
  return candidate;
}
