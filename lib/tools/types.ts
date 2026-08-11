export type Section = "tools" | "games";

export type CategoryId =
  | "text"
  | "encode"
  | "calc"
  | "unit"
  | "datetime"
  | "color"
  | "dev"
  | "random"
  | "life"
  | "midgame";

export interface CategoryDefinition {
  id: CategoryId;
  name: string;
  description: string;
  section: Section;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  componentKey: string;
  config?: Record<string, unknown>;
  keywords?: string[];
}
