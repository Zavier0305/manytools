const FIRST_NAMES = ["太郎", "花子", "健太", "美咲", "翔太", "陽菜", "大輔", "彩", "拓也", "愛"];
const LAST_NAMES = ["佐藤", "鈴木", "高橋", "田中", "伊藤", "渡辺", "山本", "中村", "小林", "加藤"];
const DOMAINS = ["example.com", "sample.jp", "mail.test", "demo.co.jp"];
const CITIES = ["東京都新宿区", "大阪府大阪市", "愛知県名古屋市", "福岡県福岡市", "北海道札幌市"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone(): string {
  return `090-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}-${String(
    Math.floor(Math.random() * 10000)
  ).padStart(4, "0")}`;
}

export interface DummyRecord {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export function generateDummyRecords(count: number): DummyRecord[] {
  return Array.from({ length: count }, () => {
    const last = pick(LAST_NAMES);
    const first = pick(FIRST_NAMES);
    const emailBase = `user${Math.floor(Math.random() * 100000)}`;
    return {
      name: `${last} ${first}`,
      email: `${emailBase}@${pick(DOMAINS)}`,
      phone: randomPhone(),
      address: pick(CITIES),
    };
  });
}
