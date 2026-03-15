import { useState, type ReactNode } from "react";
import { useTier } from "./TierProvider";

export function Why({ children }: { children: ReactNode }) {
  const { isVisible } = useTier();
  const [expanded, setExpanded] = useState(true);

  if (!isVisible("why")) return null;

  return (
    <div className="tier-content tier-why" data-tier="why">
      <button
        className="tier-why__toggle"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="tier-why__label">Under the Hood</span>
        <span className="tier-why__chevron">{expanded ? "\u25BC" : "\u25B6"}</span>
      </button>
      {expanded && <div className="tier-why__body">{children}</div>}
    </div>
  );
}
