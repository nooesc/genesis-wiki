import type { ReactNode } from "react";
import styles from "./ApiEndpoint.module.css";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiEndpointProps {
  method: HttpMethod;
  path: string;
  auth?: boolean;
  children: ReactNode;
}

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "#87AF5F",
  POST: "#6B9BD2",
  PUT: "#D4A574",
  PATCH: "#B4A7D6",
  DELETE: "#D75F5F",
};

export function ApiEndpoint({ method, path, auth, children }: ApiEndpointProps) {
  return (
    <div className={styles.endpoint}>
      <div className={styles.header}>
        <span className={styles.method} style={{ backgroundColor: METHOD_COLORS[method] }}>{method}</span>
        <code className={styles.path}>{path}</code>
        {auth && <span className={styles.authBadge}>Auth</span>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
