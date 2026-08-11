import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPageShell from "@/components/ui/ToolPageShell";
import { ALL_TOOLS, getToolBySlug } from "@/lib/tools/registry";
import { TOOL_COMPONENT_MAP } from "@/components/tools/toolComponentMap";

export function generateStaticParams() {
  return ALL_TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: tool.name,
    description: tool.description,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const ToolComponent = TOOL_COMPONENT_MAP[tool.componentKey];
  if (!ToolComponent) notFound();

  return (
    <ToolPageShell tool={tool}>
      <ToolComponent config={tool.config} />
    </ToolPageShell>
  );
}
