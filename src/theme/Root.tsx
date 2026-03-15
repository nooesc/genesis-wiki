import { TierProvider } from "../components/TierContent/TierProvider";
import type { ReactNode } from "react";

export default function Root({ children }: { children: ReactNode }) {
  return <TierProvider>{children}</TierProvider>;
}
