export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
}

export interface UseCaseItem {
  id: string;
  audience: string;
  headline: string;
  description: string;
  examplePromptTitle: string;
  benefits: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const MARKETING_FEATURES: FeatureItem[] = [
  {
    id: "feat-1",
    title: "Centralized Prompt Library",
    description: "Organize prompts by category, tags, and status. Stop losing high-performing prompts in messy spreadsheets or chat threads.",
    iconName: "FolderKanban",
    badge: "Organization",
  },
  {
    id: "feat-2",
    title: "Dynamic Variable Extraction",
    description: "Define template parameters using simple {{variable_name}} syntax. PromptPilot auto-generates structured input forms instantly.",
    iconName: "Sliders",
    badge: "Templating",
  },
  {
    id: "feat-3",
    title: "Simulated Model Playground",
    description: "Test prompt variables with simulated response runs, token count estimates, and temperature adjustments in a dedicated workspace.",
    iconName: "FlaskConical",
    badge: "Playground",
  },
  {
    id: "feat-4",
    title: "Side-by-Side Run Comparison",
    description: "Compare output text, duration, and score metrics across different models, temperatures, and prompt iterations side by side.",
    iconName: "GitCompare",
    badge: "Benchmarking",
  },
  {
    id: "feat-5",
    title: "Quality Score Tracking",
    description: "Evaluate output clarity, relevance, and completeness on a standard 10.0 quality scale to track improvement over time.",
    iconName: "BarChart3",
    badge: "Analytics",
  },
  {
    id: "feat-6",
    title: "100% Browser Local & Private",
    description: "All prompt records, test histories, and settings persist safely in your browser localStorage without requiring API keys or cloud accounts.",
    iconName: "ShieldCheck",
    badge: "Privacy",
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: "01",
    title: "Organize & Define Variables",
    description: "Catalog your prompts, set category tags, and write templates with dynamic {{variable}} tokens.",
    iconName: "FileCode",
  },
  {
    stepNumber: "02",
    title: "Test in Simulated Playground",
    description: "Fill test variable values, select model parameters, and generate simulated execution outputs.",
    iconName: "PlayCircle",
  },
  {
    stepNumber: "03",
    title: "Compare & Benchmark Runs",
    description: "Compare side-by-side outputs, analyze score trends, and ship your highest-performing prompts.",
    iconName: "TrendingUp",
  },
];

export const AUDIENCE_USE_CASES: UseCaseItem[] = [
  {
    id: "uc-devs",
    audience: "Software Engineers",
    headline: "Systematic Code Review & Refactoring Templates",
    description: "Standardize code reviews, SQL query optimizations, and pull request summary prompts across your engineering team.",
    examplePromptTitle: "Pull Request Reviewer",
    benefits: ["Enforce code style standards", "Catch edge-case bugs early", "Reduce PR turnaround time"],
  },
  {
    id: "uc-marketers",
    audience: "Marketers & Copywriters",
    headline: "High-Converting Hero Headlines & Ad Copy",
    description: "Iterate on landing page value propositions, email campaign sequences, and ad copy variants rapidly.",
    examplePromptTitle: "Landing Page Copy Improver",
    benefits: ["Test multiple copy angles", "Maintain consistent brand voice", "Improve CTA click-through rates"],
  },
  {
    id: "uc-creators",
    audience: "Content Creators",
    headline: "Structured Article Summaries & Social Posts",
    description: "Transform video transcripts, research papers, and podcasts into engaging social threads and newsletter summaries.",
    examplePromptTitle: "Customer Interview Synthesizer",
    benefits: ["Repurpose long-form content", "Extract key quotes instantly", "Maintain editorial quality"],
  },
  {
    id: "uc-product",
    audience: "Product Managers",
    headline: "User Research & Feature Specification Synthesizer",
    description: "Synthesize customer interview transcripts, draft PRD user stories, and organize feature requests effortlessly.",
    examplePromptTitle: "System Architecture Advisor",
    benefits: ["Uncover hidden user pain points", "Speed up spec drafting", "Align engineering & product goals"],
  },
  {
    id: "uc-engineers",
    audience: "Prompt Engineers",
    headline: "Precision Prompt Benchmarking & Cost Estimation",
    description: "Benchmark token efficiency, output quality scores, and temperature variance across LLM model families.",
    examplePromptTitle: "SQL Query Optimizer",
    benefits: ["Track prompt quality scores", "Estimate input/output token costs", "Version control prompt iterations"],
  },
];

export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    quote: "PromptPilot eliminated our chaotic prompt spreadsheets. Being able to compare outputs side by side saved us hours during our latest feature release.",
    authorName: "Elena Rostova",
    authorRole: "Principal AI Engineer",
    company: "Nexus Tech",
    rating: 5,
  },
  {
    id: "test-2",
    quote: "The variable template extraction is brilliant. Our marketing team can test prompt variations without breaking the underlying prompt structure.",
    authorName: "Marcus Vance",
    authorRole: "Head of Growth",
    company: "SaaSify",
    rating: 5,
  },
  {
    id: "test-3",
    quote: "Finally a prompt workspace that values privacy. Keeping all prompt records local while having score tracking makes this our default prompt playground.",
    authorName: "David Chen",
    authorRole: "Product Manager",
    company: "DataCloud Inc",
    rating: 5,
  },
];

export const MARKETING_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Is PromptPilot free to use?",
    answer: "Yes! PromptPilot is a static browser-based SaaS application with free local storage persistence. You can explore all features, manage prompts, and run simulated tests immediately.",
  },
  {
    id: "faq-2",
    question: "Do I need to connect an OpenAI or Claude API key?",
    answer: "No. PromptPilot uses a deterministic client-side mock runner for prompt simulations. No API keys, secret credentials, or network calls are required.",
  },
  {
    id: "faq-3",
    question: "Where are my prompts and test results stored?",
    answer: "All your prompts, categories, test histories, and workspace preferences are stored locally in your browser's localStorage using versioned data keys.",
  },
  {
    id: "faq-4",
    question: "How do prompt variables work?",
    answer: "Whenever you enclose a term in double curly brackets like {{variable_name}}, PromptPilot automatically detects it as a dynamic field and builds an input form for testing.",
  },
  {
    id: "faq-5",
    question: "Can I export my prompt library?",
    answer: "Yes. In the Settings page under Data Management, you can export your entire PromptPilot workspace as a structured JSON file at any time.",
  },
  {
    id: "faq-6",
    question: "Is PromptPilot responsive on mobile devices?",
    answer: "Absolutely. PromptPilot is fully responsive down to 320px mobile screens, with dedicated mobile drawers, stacked data cards, and touch-friendly controls.",
  },
];

export const SOCIAL_PROOF_METRICS = [
  { value: "2,500+", label: "Prompts Created in Demo" },
  { value: "98.4%", label: "Test Simulation Success Rate" },
  { value: "4.9 / 5", label: "User Satisfaction Score" },
  { value: "0 ms", label: "Backend API Latency" },
];
