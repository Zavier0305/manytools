export interface UnitDef {
  id: string;
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

export interface UnitCategoryDef {
  id: string;
  name: string;
  units: UnitDef[];
}

function linear(id: string, label: string, factor: number): UnitDef {
  return {
    id,
    label,
    toBase: (v) => v * factor,
    fromBase: (v) => v / factor,
  };
}

export const UNIT_CATEGORIES: Record<string, UnitCategoryDef> = {
  length: {
    id: "length",
    name: "長さ",
    units: [
      linear("mm", "ミリメートル (mm)", 0.001),
      linear("cm", "センチメートル (cm)", 0.01),
      linear("m", "メートル (m)", 1),
      linear("km", "キロメートル (km)", 1000),
      linear("inch", "インチ (in)", 0.0254),
      linear("foot", "フィート (ft)", 0.3048),
      linear("yard", "ヤード (yd)", 0.9144),
      linear("mile", "マイル (mi)", 1609.344),
    ],
  },
  weight: {
    id: "weight",
    name: "重さ",
    units: [
      linear("mg", "ミリグラム (mg)", 1e-6),
      linear("g", "グラム (g)", 0.001),
      linear("kg", "キログラム (kg)", 1),
      linear("t", "トン (t)", 1000),
      linear("oz", "オンス (oz)", 0.0283495),
      linear("lb", "ポンド (lb)", 0.453592),
    ],
  },
  temperature: {
    id: "temperature",
    name: "温度",
    units: [
      { id: "celsius", label: "摂氏 (°C)", toBase: (v) => v, fromBase: (v) => v },
      { id: "fahrenheit", label: "華氏 (°F)", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      { id: "kelvin", label: "ケルビン (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  area: {
    id: "area",
    name: "面積",
    units: [
      linear("mm2", "平方ミリメートル (mm²)", 1e-6),
      linear("cm2", "平方センチメートル (cm²)", 1e-4),
      linear("m2", "平方メートル (m²)", 1),
      linear("km2", "平方キロメートル (km²)", 1e6),
      linear("are", "アール (a)", 100),
      linear("ha", "ヘクタール (ha)", 10000),
      linear("tsubo", "坪", 3.305785),
      linear("acre", "エーカー (ac)", 4046.86),
    ],
  },
  volume: {
    id: "volume",
    name: "体積",
    units: [
      linear("ml", "ミリリットル (mL)", 0.001),
      linear("l", "リットル (L)", 1),
      linear("m3", "立方メートル (m³)", 1000),
      linear("gallon", "ガロン(US)", 3.785412),
      linear("quart", "クォート(US)", 0.946353),
      linear("cup", "カップ", 0.24),
      linear("floz", "液量オンス(US)", 0.0295735),
    ],
  },
  speed: {
    id: "speed",
    name: "速度",
    units: [
      linear("mps", "メートル毎秒 (m/s)", 1),
      linear("kph", "キロメートル毎時 (km/h)", 1 / 3.6),
      linear("mph", "マイル毎時 (mph)", 0.44704),
      linear("knot", "ノット (kn)", 0.514444),
    ],
  },
  time: {
    id: "time",
    name: "時間",
    units: [
      linear("ms", "ミリ秒", 0.001),
      linear("s", "秒", 1),
      linear("min", "分", 60),
      linear("hour", "時間", 3600),
      linear("day", "日", 86400),
      linear("week", "週", 604800),
    ],
  },
  data: {
    id: "data",
    name: "データ容量",
    units: [
      linear("bit", "ビット (bit)", 0.125),
      linear("byte", "バイト (B)", 1),
      linear("kb", "キロバイト (KB)", 1e3),
      linear("mb", "メガバイト (MB)", 1e6),
      linear("gb", "ギガバイト (GB)", 1e9),
      linear("tb", "テラバイト (TB)", 1e12),
    ],
  },
  pressure: {
    id: "pressure",
    name: "圧力",
    units: [
      linear("pa", "パスカル (Pa)", 1),
      linear("kpa", "キロパスカル (kPa)", 1000),
      linear("bar", "バール (bar)", 100000),
      linear("atm", "気圧 (atm)", 101325),
      linear("psi", "PSI", 6894.76),
      linear("mmhg", "水銀柱ミリメートル (mmHg)", 133.322),
    ],
  },
};
