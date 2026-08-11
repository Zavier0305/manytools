export default function NumberField({
  label,
  value,
  onChange,
  suffix,
  step,
  min,
}: {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  suffix?: string;
  step?: number;
  min?: number;
}) {
  return (
    <div>
      <label className="tool-label">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          className="tool-input"
          value={value}
          step={step}
          min={min}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && <span className="text-sm text-slate-500">{suffix}</span>}
      </div>
    </div>
  );
}
