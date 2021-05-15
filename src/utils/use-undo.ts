import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent, type } = action;

  switch (type) {
    case UNDO: {
      if (past.length === 0) {
        return state;
      }
      const newPresent = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      const newFuture = [present, ...future];

      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
      };
    }
    case REDO: {
      if (future.length === 0) {
        return state;
      }
      const newPresent = future[0];
      const newPast = [...past, present];
      const newFuture = future.slice(1);

      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
      };
    }
    case SET: {
      if (present === newPresent) {
        return state;
      }

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
    default: {
      return state;
    }
  }
};

export const useUndo = <T>(initialState: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialState,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({ type: UNDO }), []);

  const redo = useCallback(() => dispatch({ type: REDO }), []);

  const set = useCallback(
    (newPresent: T) => dispatch({ newPresent, type: SET }),
    []
  );

  const reset = useCallback(
    (newPresent: T) => dispatch({ newPresent, type: RESET }),
    []
  );

  return [state, undo, redo, set, reset, canUndo, canRedo];
};
