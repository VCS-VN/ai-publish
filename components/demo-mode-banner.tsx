"use client";

import { AlertCircle } from "lucide-react";
import { isDemoMode } from "@/lib/utils/env";

export function DemoModeBanner() {
  if (!isDemoMode()) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-yellow-800">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">
            You are in Demo Mode. Integrate Monmi OAuth in project settings to see real products.
          </p>
        </div>
      </div>
    </div>
  );
}
