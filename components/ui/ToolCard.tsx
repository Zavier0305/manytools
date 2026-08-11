import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools/types";

export default function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
    >
      <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700">
        {tool.name}
      </h3>
      <p className="mt-1 text-sm text-slate-500">{tool.description}</p>
    </Link>
  );
}
