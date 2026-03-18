import type {
  AsyncState,
  FetchActionRunOptions,
  ReducerCases,
} from './types.js';

type FetchActionTypes = {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
};

export function createFetchAction<S>(key: string) {
  const types: FetchActionTypes = {
    REQUEST: `${key}_REQUEST`,
    SUCCESS: `${key}_SUCCESS`,
    FAILURE: `${key}_FAILURE`,
  };

  function reducers<K extends string>(stateKey: K): ReducerCases<S> {
    return {
      [types.REQUEST]: (state: S) => ({
        ...state,
        [stateKey]: {
          ...((state as Record<string, unknown>)[
            stateKey
          ] as AsyncState<unknown>),
          loading: true,
          error: null,
        },
      }),
      [types.SUCCESS]: (state: S, payload?: unknown) => ({
        ...state,
        [stateKey]: {
          data: payload,
          loading: false,
          error: null,
        },
      }),
      [types.FAILURE]: (state: S, payload?: unknown) => ({
        ...state,
        [stateKey]: {
          ...((state as Record<string, unknown>)[
            stateKey
          ] as AsyncState<unknown>),
          loading: false,
          error: payload as Error,
        },
      }),
    };
  }

  async function run(
    dispatch: (action: { type: string; payload?: unknown }) => void,
    options: FetchActionRunOptions
  ): Promise<void> {
    dispatch({ type: types.REQUEST });

    try {
      const response = await fetch(options.url, options.params);
      const json: unknown = await response.json();
      const data = options.mutator ? options.mutator({ response: json }) : json;
      dispatch({ type: types.SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: types.FAILURE,
        payload: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }

  return { types, reducers, run };
}
