export default function ResultCard({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="tool-panel space-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-baseline justify-between">
          <span className="text-sm text-slate-500">{item.label}</span>
          <span className="text-xl font-bold text-indigo-600">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
