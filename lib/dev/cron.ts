const WEEKDAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"];

function describeField(value: string, name: string, isWeekday: boolean): string {
  if (value === "*") return `毎${name}`;
  if (value.startsWith("*/")) return `${value.slice(2)}${name}ごと`;
  if (value.includes(",")) {
    const parts = value.split(",").map((v) => (isWeekday ? WEEKDAY_NAMES[Number(v)] ?? v : v));
    return `${name} ${parts.join("、")}`;
  }
  if (value.includes("-")) {
    const [start, end] = value.split("-");
    return `${name} ${isWeekday ? WEEKDAY_NAMES[Number(start)] : start} から ${isWeekday ? WEEKDAY_NAMES[Number(end)] : end}`;
  }
  return `${name} ${isWeekday ? (WEEKDAY_NAMES[Number(value)] ?? value) : value}`;
}

export function explainCron(expression: string): string {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    throw new Error("Cron式は5つのフィールド(分 時 日 月 曜日)で指定してください");
  }
  const [minute, hour, day, month, weekday] = parts;

  const segments: string[] = [];
  if (minute !== "*") segments.push(describeField(minute, "分", false));
  if (hour !== "*") segments.push(describeField(hour, "時", false));
  if (day !== "*") segments.push(describeField(day, "日", false));
  if (month !== "*") segments.push(describeField(month, "月", false));
  if (weekday !== "*") segments.push(describeField(weekday, "曜日", true));

  if (segments.length === 0) return "毎分実行されます";

  let summary = "";
  if (minute === "*" && hour === "*") {
    summary = "毎分";
  } else if (minute.startsWith("*/") && hour === "*") {
    summary = `${minute.slice(2)}分おきに`;
  } else {
    const hourText = hour === "*" ? "毎時" : `${hour}時`;
    const minuteText = minute === "*" ? "0分" : `${minute}分`;
    summary = `${hourText}${minuteText}に`;
  }

  const extra = [
    day !== "*" ? describeField(day, "日", false) : "",
    month !== "*" ? describeField(month, "月", false) : "",
    weekday !== "*" ? describeField(weekday, "曜日", true) : "",
  ]
    .filter(Boolean)
    .join("、");

  return `${extra ? extra + "の" : ""}${summary}実行します`;
}
