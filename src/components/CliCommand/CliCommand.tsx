import type { ReactNode } from "react";
import styles from "./CliCommand.module.css";

interface CliCommandProps {
  name: string;
  usage: string;
  source: string;
  children: ReactNode;
}

export function CliCommand({ name, usage, source, children }: CliCommandProps) {
  return (
    <div className={styles.cliCommand}>
      <div className={styles.header}>
        <h1 className={styles.name}>genesis {name}</h1>
        <div className={styles.usage}><code>{usage}</code></div>
        <div className={styles.meta}>
          <span className={styles.sourceLabel}>Source:</span>
          <code className={styles.source}>{source}</code>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
