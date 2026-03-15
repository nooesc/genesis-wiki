/**
 * Vitest setup: Polyfill Web Storage API.
 *
 * Node 22+ ships a built-in `localStorage` that uses a Map-like API
 * (property access, no .getItem/.setItem/.clear). This conflicts with
 * jsdom/happy-dom which expect the W3C Storage interface. We replace
 * the global with a spec-compliant in-memory implementation.
 */

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  key(index: number): string | null {
    const keys = [...this.store.keys()];
    return keys[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }

  // Index signature required by Storage interface
  [name: string]: unknown;
}

Object.defineProperty(globalThis, "localStorage", {
  value: new MemoryStorage(),
  writable: true,
  configurable: true,
});

Object.defineProperty(globalThis, "sessionStorage", {
  value: new MemoryStorage(),
  writable: true,
  configurable: true,
});
