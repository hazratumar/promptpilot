export type PricingPlan = {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  isPopular?: boolean;
  features: string[];
  ctaLabel: string;
  limits: {
    prompts: string;
    testsPerMonth: string;
    history: string;
    teamMembers: string;
  };
};
