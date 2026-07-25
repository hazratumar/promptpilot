export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
  plan: "Free" | "Pro" | "Team";
  createdAt: string;
};
