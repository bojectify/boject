import type { ReducerCases } from './types.js';

export function asyncReducer<S>(
  state: S,
  action: { type: string; payload?: unknown },
  cases: ReducerCases<S>
): S {
  const handler = cases[action.type];
  if (!handler) {
    return state;
  }
  return handler(state, action.payload);
}
