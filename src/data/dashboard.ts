export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: "info" | "success" | "warning";
}

export interface ActivityItem {
  id: string;
  type: "test_run" | "prompt_created" | "prompt_updated" | "favorite_added";
  title: string;
  description: string;
  timestamp: string;
  promptId?: string;
  score?: number;
}

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Welcome to PromptPilot!",
    message: "Your static browser workspace is configured with 8 realistic prompt templates.",
    timestamp: "10 mins ago",
    isRead: false,
    type: "info",
  },
  {
    id: "notif-2",
    title: "Test Run Completed",
    message: "Pull Request Reviewer achieved an overall quality score of 9.4 / 10.",
    timestamp: "1 hour ago",
    isRead: false,
    type: "success",
  },
  {
    id: "notif-3",
    title: "New Category Available",
    message: "Data & Analytics category added with SQL Query Optimizer template.",
    timestamp: "1 day ago",
    isRead: true,
    type: "info",
  },
  {
    id: "notif-4",
    title: "Benchmark Warning",
    message: "System Architecture Advisor run had higher estimated latency (3500ms).",
    timestamp: "2 days ago",
    isRead: true,
    type: "warning",
  },
];

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    type: "test_run",
    title: "Ran test simulation on 'Pull Request Reviewer'",
    description: "Model: Claude 3.7 Sonnet Demo &bull; Duration: 1420ms &bull; Score: 9.4",
    timestamp: "25 minutes ago",
    promptId: "prompt-1",
    score: 9.4,
  },
  {
    id: "act-2",
    type: "prompt_updated",
    title: "Updated template content in 'Landing Page Copy Improver'",
    description: "Added target audience variable token {{target_audience}}",
    timestamp: "2 hours ago",
    promptId: "prompt-2",
  },
  {
    id: "act-3",
    type: "favorite_added",
    title: "Added 'SQL Query Optimizer' to favorites",
    description: "Pinned in workspace shortcuts for quick access",
    timestamp: "5 hours ago",
    promptId: "prompt-4",
  },
  {
    id: "act-4",
    type: "test_run",
    title: "Ran test simulation on 'Customer Interview Synthesizer'",
    description: "Model: Claude 3.7 Sonnet Demo &bull; Score: 8.8",
    timestamp: "1 day ago",
    promptId: "prompt-3",
    score: 8.8,
  },
  {
    id: "act-5",
    type: "prompt_created",
    title: "Created draft prompt 'Empathetic Customer Support Resolver'",
    description: "Added 3 dynamic variables for support reply generation",
    timestamp: "2 days ago",
    promptId: "prompt-6",
  },
];
