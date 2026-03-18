export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export type MutatorFn<T = unknown> = (args: { response: unknown }) => T;

export type FetchActionRunOptions = {
  url: string;
  params?: RequestInit;
  mutator?: MutatorFn;
};

export type ReducerCases<S> = Record<
  string,
  (state: S, payload?: unknown) => S
>;
