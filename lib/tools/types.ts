export type CategoryId =
  | "text"
  | "encode"
  | "calc"
  | "unit"
  | "datetime"
  | "color"
  | "dev"
  | "random"
  | "life";

export interface CategoryDefinition {
  id: CategoryId;
  name: string;
  description: string;
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
