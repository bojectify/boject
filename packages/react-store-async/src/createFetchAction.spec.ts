import { createFetchAction } from './createFetchAction.js';

type TestState = {
  user: { data: string | null; loading: boolean; error: Error | null };
};

describe('createFetchAction', () => {
  it('generates correct action type constants', () => {
    const fetchUser = createFetchAction<TestState>('FETCH_USER');
    expect(fetchUser.types).toEqual({
      REQUEST: 'FETCH_USER_REQUEST',
      SUCCESS: 'FETCH_USER_SUCCESS',
      FAILURE: 'FETCH_USER_FAILURE',
    });
  });

  it('generates reducer cases for a state key', () => {
    const fetchUser = createFetchAction<TestState>('FETCH_USER');
    const cases = fetchUser.reducers('user');
    expect(cases).toHaveProperty('FETCH_USER_REQUEST');
    expect(cases).toHaveProperty('FETCH_USER_SUCCESS');
    expect(cases).toHaveProperty('FETCH_USER_FAILURE');
  });

  it('REQUEST case sets loading true', () => {
    const fetchUser = createFetchAction<TestState>('FETCH_USER');
    const cases = fetchUser.reducers('user');
    const state: TestState = {
      user: { data: null, loading: false, error: null },
    };
    const result = cases['FETCH_USER_REQUEST'](state);
    expect(result.user.loading).toBe(true);
    expect(result.user.error).toBeNull();
  });

  it('SUCCESS case sets data and loading false', () => {
    const fetchUser = createFetchAction<TestState>('FETCH_USER');
    const cases = fetchUser.reducers('user');
    const state: TestState = {
      user: { data: null, loading: true, error: null },
    };
    const result = cases['FETCH_USER_SUCCESS'](state, 'Alice');
    expect(result.user.data).toBe('Alice');
    expect(result.user.loading).toBe(false);
  });

  it('FAILURE case sets error and loading false', () => {
    const fetchUser = createFetchAction<TestState>('FETCH_USER');
    const cases = fetchUser.reducers('user');
    const state: TestState = {
      user: { data: null, loading: true, error: null },
    };
    const error = new Error('Network error');
    const result = cases['FETCH_USER_FAILURE'](state, error);
    expect(result.user.error).toBe(error);
    expect(result.user.loading).toBe(false);
  });

  it('run dispatches lifecycle actions and calls fetch', async () => {
    const fetchUser = createFetchAction<TestState>('FETCH_USER');
    const dispatched: { type: string; payload?: unknown }[] = [];
    const dispatch = (action: { type: string; payload?: unknown }) => {
      dispatched.push(action);
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ name: 'Alice' }),
    });

    await fetchUser.run(dispatch, {
      url: '/api/user/1',
      mutator: ({ response }) => (response as { name: string }).name,
    });

    expect(dispatched[0].type).toBe('FETCH_USER_REQUEST');
    expect(dispatched[1].type).toBe('FETCH_USER_SUCCESS');
    expect(dispatched[1].payload).toBe('Alice');
  });

  it('run dispatches FAILURE on fetch error', async () => {
    const fetchUser = createFetchAction<TestState>('FETCH_USER');
    const dispatched: { type: string; payload?: unknown }[] = [];
    const dispatch = (action: { type: string; payload?: unknown }) => {
      dispatched.push(action);
    };

    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await fetchUser.run(dispatch, { url: '/api/user/1' });

    expect(dispatched[0].type).toBe('FETCH_USER_REQUEST');
    expect(dispatched[1].type).toBe('FETCH_USER_FAILURE');
    expect(dispatched[1].payload).toBeInstanceOf(Error);
  });
});
