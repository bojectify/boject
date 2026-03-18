import { asyncReducer } from './asyncReducer.js';
import type { ReducerCases } from './types.js';

type TestState = {
  user: { data: string | null; loading: boolean; error: Error | null };
};

describe('asyncReducer', () => {
  const cases: ReducerCases<TestState> = {
    FETCH_USER_REQUEST: (state) => ({
      ...state,
      user: { ...state.user, loading: true, error: null },
    }),
    FETCH_USER_SUCCESS: (state, payload) => ({
      ...state,
      user: { data: payload as string, loading: false, error: null },
    }),
    FETCH_USER_FAILURE: (state, payload) => ({
      ...state,
      user: { ...state.user, loading: false, error: payload as Error },
    }),
  };

  const initial: TestState = {
    user: { data: null, loading: false, error: null },
  };

  it('applies matching reducer case', () => {
    const result = asyncReducer(initial, { type: 'FETCH_USER_REQUEST' }, cases);
    expect(result.user.loading).toBe(true);
  });

  it('applies success case with payload', () => {
    const result = asyncReducer(
      initial,
      { type: 'FETCH_USER_SUCCESS', payload: 'Alice' },
      cases
    );
    expect(result.user.data).toBe('Alice');
    expect(result.user.loading).toBe(false);
  });

  it('returns state unchanged for unknown action type', () => {
    const result = asyncReducer(initial, { type: 'UNKNOWN' }, cases);
    expect(result).toBe(initial);
  });
});
