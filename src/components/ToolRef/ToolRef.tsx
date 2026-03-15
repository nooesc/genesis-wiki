import type { ReactNode } from "react";
import styles from "./ToolRef.module.css";

interface ToolRefProps {
  name: string;
  module: string;
  crate: string;
  children: ReactNode;
}

export function ToolRef({ name, module: mod, crate: crateName, children }: ToolRefProps) {
  return (
    <div className={styles.toolRef}>
      <div className={styles.header}>
        <h1 className={styles.name}>{name}</h1>
        <div className={styles.meta}>
          <span className={styles.badge}>{crateName}</span>
          <code className={styles.source}>{mod}</code>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
