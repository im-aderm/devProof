"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (process.env.NEXT_PUBLIC_POSTHOG_HOST && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // Add other options if needed, e.g., for identifying users
  });
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  // Only render PostHogProvider if the keys are available
  if (process.env.NEXT_PUBLIC_POSTHOG_HOST && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return (
      <PostHogProvider
        config={{
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        }}
        key={process.env.NEXT_PUBLIC_POSTHOG_KEY}
      >
        {children}
      </PostHogProvider>
    );
  }
  // If PostHog is not configured, just return children
  return <>{children}</>;
}
