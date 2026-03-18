import type { Dispatch, ReactNode } from 'react';

export type ActionPayload<T extends string = string> = {
  type: T;
  payload?: unknown;
};

export type ActionContext<S> = {
  state: S;
  dispatch: Dispatch<ActionPayload>;
};

export type Action<S> = (
  context: ActionContext<S>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
) => void | Promise<void>;

export type Actions<S> = Record<string, Action<S>>;

export type Getter<S> = (state: S, getters: Record<string, unknown>) => unknown;

export type Getters<S> = Record<string, Getter<S>>;

export type StoreConfig<S, A extends Actions<S>, G extends Getters<S>> = {
  initialState: S;
  reducer: (state: S, action: ActionPayload) => S;
  actions: A;
  getters?: G;
};

export type ResolvedGetters<G extends Getters<never>> = {
  [K in keyof G]: ReturnType<G[K]>;
};

export type StoreValue<S, A extends Actions<S>, G extends Getters<S>> = {
  state: S;
  actions: {
    [K in keyof A]: (payload?: Parameters<A[K]>[1]) => void | Promise<void>;
  };
  getters: ResolvedGetters<G>;
};

export type ProviderProps<S> = {
  children: ReactNode;
  initialState?: Partial<S>;
};
