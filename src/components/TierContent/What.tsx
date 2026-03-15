import { type ReactNode } from "react";
import { useTier } from "./TierProvider";

export function What({ children }: { children: ReactNode }) {
  const { isVisible } = useTier();
  if (!isVisible("what")) return null;
  return (
    <div className="tier-content tier-what" data-tier="what">
      {children}
    </div>
  );
}
