import { useTier, type Tier } from "../TierContent/TierProvider";
import styles from "./TierToggle.module.css";

const TIERS: { key: Tier; label: string }[] = [
  { key: "what", label: "What" },
  { key: "how", label: "How" },
  { key: "why", label: "Why" },
];

export function TierToggle() {
  const { tier, setTier } = useTier();
  return (
    <div className={styles.toggleGroup}>
      {TIERS.map(({ key, label }) => (
        <button
          key={key}
          className={`${styles.toggleButton} ${tier === key ? styles.active : ""}`}
          onClick={() => setTier(key)}
          aria-pressed={tier === key}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
