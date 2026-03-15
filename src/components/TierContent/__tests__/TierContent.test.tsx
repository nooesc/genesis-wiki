import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { TierProvider } from "../TierProvider";
import { What } from "../What";
import { How } from "../How";
import { Why } from "../Why";
import type { ReactNode } from "react";

function renderWithTier(tier: "what" | "how" | "why", ui: ReactNode) {
  localStorage.setItem("genesis-wiki-tier", tier);
  const result = render(<TierProvider>{ui}</TierProvider>);
  // Flush the useEffect that reads from localStorage
  act(() => {});
  return result;
}

describe("What component", () => {
  beforeEach(() => localStorage.clear());

  it("renders when tier is 'what'", () => {
    renderWithTier("what", <What>What content</What>);
    expect(screen.getByText("What content")).toBeDefined();
  });

  it("renders when tier is 'how' (additive)", () => {
    renderWithTier("how", <What>What content</What>);
    expect(screen.getByText("What content")).toBeDefined();
  });

  it("renders when tier is 'why' (additive)", () => {
    renderWithTier("why", <What>What content</What>);
    expect(screen.getByText("What content")).toBeDefined();
  });
});

describe("How component", () => {
  beforeEach(() => localStorage.clear());

  it("does not render when tier is 'what'", () => {
    renderWithTier("what", <How>How content</How>);
    expect(screen.queryByText("How content")).toBeNull();
  });

  it("renders when tier is 'how'", () => {
    renderWithTier("how", <How>How content</How>);
    expect(screen.getByText("How content")).toBeDefined();
  });

  it("renders when tier is 'why' (additive)", () => {
    renderWithTier("why", <How>How content</How>);
    expect(screen.getByText("How content")).toBeDefined();
  });
});

describe("Why component", () => {
  beforeEach(() => localStorage.clear());

  it("does not render when tier is 'what'", () => {
    renderWithTier("what", <Why>Why content</Why>);
    expect(screen.queryByText("Why content")).toBeNull();
  });

  it("does not render when tier is 'how'", () => {
    renderWithTier("how", <Why>Why content</Why>);
    expect(screen.queryByText("Why content")).toBeNull();
  });

  it("renders when tier is 'why'", () => {
    renderWithTier("why", <Why>Why content</Why>);
    expect(screen.getByText("Why content")).toBeDefined();
  });
});
