const JA_SENTENCES = [
  "吾輩は猫である。名前はまだ無い。",
  "本日は晴天なり、風もなく穏やかな一日であった。",
  "この文章はダミーテキストとして自動生成されています。",
  "レイアウト確認のためのサンプル文章です。",
  "山田さんは駅前の喫茶店でコーヒーを飲みながら本を読んでいた。",
  "技術の進歩は私たちの生活を大きく変えてきた。",
  "明日の会議までに資料をまとめておく必要がある。",
  "季節の変わり目には体調を崩しやすいので注意が必要だ。",
  "新しいプロジェクトが来月からスタートする予定です。",
  "静かな図書館で読書をするのが週末の楽しみだ。",
];

const LOREM_WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(
    " "
  );

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateJapaneseLorem(paragraphs: number, sentencesPerParagraph = 5): string {
  const result: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const sentences = Array.from({ length: sentencesPerParagraph }, () => randomItem(JA_SENTENCES));
    result.push(sentences.join(""));
  }
  return result.join("\n\n");
}

export function generateLoremIpsum(paragraphs: number, wordsPerParagraph = 40): string {
  const result: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const words = Array.from({ length: wordsPerParagraph }, () => randomItem(LOREM_WORDS));
    const text = words.join(" ");
    result.push(text.charAt(0).toUpperCase() + text.slice(1) + ".");
  }
  return result.join("\n\n");
}
