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
  energy: {
    id: "energy",
    name: "エネルギー",
    units: [
      linear("j", "ジュール (J)", 1),
      linear("kj", "キロジュール (kJ)", 1000),
      linear("cal", "カロリー (cal)", 4.184),
      linear("kcal", "キロカロリー (kcal)", 4184),
      linear("wh", "ワット時 (Wh)", 3600),
      linear("kwh", "キロワット時 (kWh)", 3600000),
      linear("btu", "英熱量 (BTU)", 1055.06),
    ],
  },
  power: {
    id: "power",
    name: "仕事率(パワー)",
    units: [
      linear("w", "ワット (W)", 1),
      linear("kw", "キロワット (kW)", 1000),
      linear("mw", "メガワット (MW)", 1e6),
      linear("hp", "馬力(仏馬力) (hp)", 745.7),
      linear("ps", "馬力(仏馬力/PS)", 735.5),
    ],
  },
  angle: {
    id: "angle",
    name: "角度",
    units: [
      linear("deg", "度 (°)", 1),
      linear("rad", "ラジアン (rad)", 57.29578),
      linear("grad", "グラード (grad)", 0.9),
      linear("arcmin", "分 (′)", 1 / 60),
      linear("arcsec", "秒 (″)", 1 / 3600),
    ],
  },
  frequency: {
    id: "frequency",
    name: "周波数",
    units: [
      linear("hz", "ヘルツ (Hz)", 1),
      linear("khz", "キロヘルツ (kHz)", 1000),
      linear("mhz", "メガヘルツ (MHz)", 1e6),
      linear("ghz", "ギガヘルツ (GHz)", 1e9),
      linear("rpm", "回転毎分 (rpm)", 1 / 60),
    ],
  },
  "fuel-economy": {
    id: "fuel-economy",
    name: "燃費",
    units: [
      { id: "kml", label: "km/L", toBase: (v) => v, fromBase: (v) => v },
      { id: "mpg-us", label: "mpg(US)", toBase: (v) => v * 0.425144, fromBase: (v) => v / 0.425144 },
      { id: "mpg-imp", label: "mpg(英国)", toBase: (v) => v * 0.354006, fromBase: (v) => v / 0.354006 },
      {
        id: "l100km",
        label: "L/100km",
        toBase: (v) => (v > 0 ? 100 / v : 0),
        fromBase: (v) => (v > 0 ? 100 / v : 0),
      },
    ],
  },
  typography: {
    id: "typography",
    name: "タイポグラフィ",
    units: [
      linear("px", "ピクセル (px)", 1),
      linear("pt", "ポイント (pt)", 96 / 72),
      linear("pc", "パイカ (pc)", 16),
      linear("in", "インチ (in)", 96),
      linear("mm", "ミリメートル (mm)", 96 / 25.4),
      linear("cm", "センチメートル (cm)", 96 / 2.54),
      linear("em", "em(16px基準)", 16),
      linear("rem", "rem(16px基準)", 16),
    ],
  },
  torque: {
    id: "torque",
    name: "トルク",
    units: [
      linear("nm", "ニュートンメートル (N·m)", 1),
      linear("kgfm", "重量キログラムメートル (kgf·m)", 9.80665),
      linear("lbfft", "重量ポンドフィート (lbf·ft)", 1.35582),
      linear("lbfin", "重量ポンドインチ (lbf·in)", 0.112985),
    ],
  },
  density: {
    id: "density",
    name: "密度",
    units: [
      linear("kgm3", "キログラム毎立方メートル (kg/m³)", 1),
      linear("gcm3", "グラム毎立方センチメートル (g/cm³)", 1000),
      linear("gml", "グラム毎ミリリットル (g/mL)", 1000),
      linear("lbft3", "ポンド毎立方フィート (lb/ft³)", 16.0185),
      linear("lbgal", "ポンド毎ガロン(US) (lb/gal)", 119.826),
    ],
  },
  force: {
    id: "force",
    name: "力",
    units: [
      linear("n", "ニュートン (N)", 1),
      linear("kn", "キロニュートン (kN)", 1000),
      linear("kgf", "重量キログラム (kgf)", 9.80665),
      linear("lbf", "重量ポンド (lbf)", 4.44822),
      linear("dyn", "ダイン (dyn)", 0.00001),
    ],
  },
  "data-transfer-rate": {
    id: "data-transfer-rate",
    name: "データ転送速度",
    units: [
      linear("bps", "ビット毎秒 (bps)", 1),
      linear("kbps", "キロビット毎秒 (Kbps)", 1000),
      linear("mbps", "メガビット毎秒 (Mbps)", 1e6),
      linear("gbps", "ギガビット毎秒 (Gbps)", 1e9),
      linear("kBps", "キロバイト毎秒 (KB/s)", 8000),
      linear("mBps", "メガバイト毎秒 (MB/s)", 8e6),
    ],
  },
  illuminance: {
    id: "illuminance",
    name: "照度",
    units: [linear("lux", "ルクス (lx)", 1), linear("fc", "フットキャンドル (fc)", 10.7639)],
  },
  "angular-velocity": {
    id: "angular-velocity",
    name: "角速度",
    units: [
      linear("rads", "ラジアン毎秒 (rad/s)", 1),
      linear("degs", "度毎秒 (°/s)", 0.0174533),
      linear("avrpm", "回転毎分 (rpm)", 0.10472),
      linear("rps", "回転毎秒 (rps)", 6.28319),
    ],
  },
  "flow-rate": {
    id: "flow-rate",
    name: "流量",
    units: [
      linear("lmin", "リットル毎分 (L/min)", 1),
      linear("ls", "リットル毎秒 (L/s)", 60),
      linear("m3h", "立方メートル毎時 (m³/h)", 16.6667),
      linear("gpm", "ガロン毎分(US) (gpm)", 3.78541),
      linear("mlmin", "ミリリットル毎分 (mL/min)", 0.001),
    ],
  },
};
