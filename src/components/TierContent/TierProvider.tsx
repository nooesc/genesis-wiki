import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Tier = "what" | "how" | "why";

const TIER_ORDER: Record<Tier, number> = { what: 0, how: 1, why: 2 };
const STORAGE_KEY = "genesis-wiki-tier";

interface TierContextValue {
  tier: Tier;
  setTier: (tier: Tier) => void;
  isVisible: (contentTier: Tier) => boolean;
}

const TierContext = createContext<TierContextValue | null>(null);

export function TierProvider({ children }: { children: ReactNode }) {
  const [tier, setTierState] = useState<Tier>("what");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in TIER_ORDER) {
      setTierState(stored as Tier);
    }
  }, []);

  const setTier = useCallback((t: Tier) => {
    setTierState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* noop — storage full or unavailable */
    }
  }, []);

  const isVisible = useCallback(
    (contentTier: Tier) => TIER_ORDER[contentTier] <= TIER_ORDER[tier],
    [tier],
  );

  return (
    <TierContext.Provider value={{ tier, setTier, isVisible }}>
      {children}
    </TierContext.Provider>
  );
}

export function useTier(): TierContextValue {
  const context = useContext(TierContext);
  if (!context) {
    throw new Error("useTier must be used within a TierProvider");
  }
  return context;
}
