import { type ReactNode } from "react";
import { useTier } from "./TierProvider";

export function How({ children }: { children: ReactNode }) {
  const { isVisible } = useTier();
  if (!isVisible("how")) return null;
  return (
    <div className="tier-content tier-how" data-tier="how">
      {children}
    </div>
  );
}
