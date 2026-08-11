export interface EraDef {
  name: string;
  start: number;
}

export const ERAS: EraDef[] = [
  { name: "令和", start: 2019 },
  { name: "平成", start: 1989 },
  { name: "昭和", start: 1926 },
  { name: "大正", start: 1912 },
  { name: "明治", start: 1868 },
];

export function westernToEra(year: number): string {
  const era = ERAS.find((e) => year >= e.start);
  if (!era) throw new Error("対応する元号が見つかりません(1868年以降を入力してください)");
  const eraYear = year - era.start + 1;
  return `${era.name}${eraYear === 1 ? "元" : eraYear}年`;
}

export function eraToWestern(eraName: string, eraYear: number): number {
  const era = ERAS.find((e) => e.name === eraName);
  if (!era) throw new Error("元号が見つかりません");
  return era.start + eraYear - 1;
}
