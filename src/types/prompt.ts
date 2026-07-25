export type PromptVariable = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  required: boolean;
};

export type Prompt = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  categoryId: string;
  tags: string[];
  variables: PromptVariable[];
  recommendedModel: string;
  status: "draft" | "active" | "archived";
  isFavorite: boolean;
  isSaved: boolean;
  useCount: number;
  averageScore: number;
  createdAt: string;
  updatedAt: string;
  lastTestedAt?: string;
};
