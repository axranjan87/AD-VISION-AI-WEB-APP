"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-dark-card border border-white/10 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Convex Not Configured</h2>
          <p className="text-gray-400 mb-4">
            Please set NEXT_PUBLIC_CONVEX_URL in your .env.local file
          </p>
          <p className="text-sm text-gray-500">
            Run: <code className="bg-dark-muted px-2 py-1 rounded">npm run convex:dev</code> to get your URL
          </p>
        </div>
      </div>
    );
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
