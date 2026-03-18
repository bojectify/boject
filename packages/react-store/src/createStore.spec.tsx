import { renderHook, act } from '@testing-library/react';
import { createStore } from './createStore.js';
import type { ActionPayload } from './createStore.types.js';

type TestState = {
  count: number;
  multiplier: number;
};

const setup = () =>
  createStore({
    initialState: { count: 0, multiplier: 2 } as TestState,
    reducer: (state: TestState, action: ActionPayload) => {
      switch (action.type) {
        case 'INCREMENT':
          return { ...state, count: state.count + (action.payload as number) };
        default:
          return state;
      }
    },
    actions: {
      increment: ({ dispatch }, amount: number) => {
        dispatch({ type: 'INCREMENT', payload: amount });
      },
    },
    getters: {
      doubled: (state: TestState) => state.count * 2,
      multiplied: (state: TestState, getters: Record<string, unknown>) =>
        (getters.doubled as number) * state.multiplier,
    },
  });

describe('createStore', () => {
  it('provides initial state via useStore', () => {
    const { Provider, useStore } = setup();
    const { result } = renderHook(() => useStore(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    });

    expect(result.current.state.count).toBe(0);
    expect(result.current.state.multiplier).toBe(2);
  });

  it('dispatches actions and updates state', () => {
    const { Provider, useStore } = setup();
    const { result } = renderHook(() => useStore(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    });

    act(() => {
      result.current.actions.increment(5);
    });

    expect(result.current.state.count).toBe(5);
  });

  it('resolves getters from state', () => {
    const { Provider, useStore } = setup();
    const { result } = renderHook(() => useStore(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    });

    expect(result.current.getters.doubled).toBe(0);
    expect(result.current.getters.multiplied).toBe(0);

    act(() => {
      result.current.actions.increment(3);
    });

    expect(result.current.getters.doubled).toBe(6);
    expect(result.current.getters.multiplied).toBe(12);
  });

  it('resolves getters that depend on other getters', () => {
    const { Provider, useStore } = setup();
    const { result } = renderHook(() => useStore(), {
      wrapper: ({ children }) => <Provider>{children}</Provider>,
    });

    act(() => {
      result.current.actions.increment(4);
    });

    // doubled = 4 * 2 = 8, multiplied = 8 * 2 = 16
    expect(result.current.getters.multiplied).toBe(16);
  });

  it('accepts optional initialState override via Provider', () => {
    const { Provider, useStore } = setup();
    const { result } = renderHook(() => useStore(), {
      wrapper: ({ children }) => (
        <Provider initialState={{ count: 10 }}>{children}</Provider>
      ),
    });

    expect(result.current.state.count).toBe(10);
    expect(result.current.state.multiplier).toBe(2);
  });

  it('throws when useStore is called outside Provider', () => {
    const { useStore } = setup();

    expect(() => {
      renderHook(() => useStore());
    }).toThrow();
  });
});
