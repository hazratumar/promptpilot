"use client";

import * as React from "react";
import { getItem, setItem } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";

export interface UserSubscription {
  planId: "free" | "pro" | "team";
  planName: string;
  billingCycle: "monthly" | "annual";
  status: "active" | "canceled" | "past_due";
  currentPeriodEnd: string;
  paymentMethodLast4: string;
  paymentMethodBrand: string;
}

const DEFAULT_SUBSCRIPTION: UserSubscription = {
  planId: "pro",
  planName: "Pro Creator",
  billingCycle: "monthly",
  status: "active",
  currentPeriodEnd: "2026-08-25T00:00:00Z",
  paymentMethodLast4: "4242",
  paymentMethodBrand: "Visa",
};

export function useSubscription() {
  const [subscription, setSubscription] = React.useState<UserSubscription>(DEFAULT_SUBSCRIPTION);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const stored = getItem<UserSubscription>(STORAGE_KEYS.SUBSCRIPTION, DEFAULT_SUBSCRIPTION);
    setSubscription({ ...DEFAULT_SUBSCRIPTION, ...stored });
    setIsLoaded(true);
  }, []);

  const changePlan = (planId: "free" | "pro" | "team", billingCycle: "monthly" | "annual" = "monthly") => {
    const names = { free: "Free Developer", pro: "Pro Creator", team: "Enterprise Team" };
    const updated: UserSubscription = {
      ...subscription,
      planId,
      planName: names[planId],
      billingCycle,
      status: "active",
    };
    setSubscription(updated);
    setItem(STORAGE_KEYS.SUBSCRIPTION, updated);
  };

  const cancelSubscription = () => {
    const updated: UserSubscription = {
      ...subscription,
      status: "canceled",
    };
    setSubscription(updated);
    setItem(STORAGE_KEYS.SUBSCRIPTION, updated);
  };

  return {
    subscription,
    isLoaded,
    changePlan,
    cancelSubscription,
  };
}
