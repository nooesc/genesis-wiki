import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { TierProvider, useTier, type Tier } from "../TierProvider";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <TierProvider>{children}</TierProvider>
);

describe("TierProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to 'what' tier", () => {
    const { result } = renderHook(() => useTier(), { wrapper });
    expect(result.current.tier).toBe("what");
  });

  it("updates tier when setTier is called", () => {
    const { result } = renderHook(() => useTier(), { wrapper });
    act(() => result.current.setTier("how"));
    expect(result.current.tier).toBe("how");
  });

  it("persists tier to localStorage", () => {
    const { result } = renderHook(() => useTier(), { wrapper });
    act(() => result.current.setTier("why"));
    expect(localStorage.getItem("genesis-wiki-tier")).toBe("why");
  });

  it("isVisible returns correct values for 'what' tier", () => {
    const { result } = renderHook(() => useTier(), { wrapper });
    expect(result.current.isVisible("what")).toBe(true);
    expect(result.current.isVisible("how")).toBe(false);
    expect(result.current.isVisible("why")).toBe(false);
  });

  it("isVisible returns correct values for 'how' tier (additive)", () => {
    const { result } = renderHook(() => useTier(), { wrapper });
    act(() => result.current.setTier("how"));
    expect(result.current.isVisible("what")).toBe(true);
    expect(result.current.isVisible("how")).toBe(true);
    expect(result.current.isVisible("why")).toBe(false);
  });

  it("isVisible returns correct values for 'why' tier (shows all)", () => {
    const { result } = renderHook(() => useTier(), { wrapper });
    act(() => result.current.setTier("why"));
    expect(result.current.isVisible("what")).toBe(true);
    expect(result.current.isVisible("how")).toBe(true);
    expect(result.current.isVisible("why")).toBe(true);
  });
});
