import type { Getters } from './createStore.types.js';

export function resolveGetters<S, G extends Getters<S>>(
  state: S,
  getterDefs: G
): { [K in keyof G]: ReturnType<G[K]> } {
  const cache = new Map<string, unknown>();

  const proxy = new Proxy({} as Record<string, unknown>, {
    get(_target, prop: string) {
      if (cache.has(prop)) {
        return cache.get(prop);
      }
      const getter = getterDefs[prop];
      if (!getter) {
        return undefined;
      }
      const value = getter(state, proxy);
      cache.set(prop, value);
      return value;
    },
  });

  // Force-resolve all getters so the returned object has real values
  for (const key of Object.keys(getterDefs)) {
    void proxy[key];
  }

  return proxy as { [K in keyof G]: ReturnType<G[K]> };
}
