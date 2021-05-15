import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "./index";

interface State<D = null> {
  stat: "idle" | "loading" | "error" | "success";
  data: D | null;
  error: Error | null;
}

const defaultInitialState: State = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  const [retry, setRetry] = useState(() => () => {});
  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        stat: "success",
        data: data,
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        stat: "error",
        data: null,
        error: error,
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      safeDispatch({ stat: "loading" });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            console.log("run test");
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, safeDispatch, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    retry,
    setData,
    setError,
    ...state,
  };
};

const useSafeDispatch = <D>(dispatch: (action: Partial<State<D>>) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (action: Partial<State<D>>) =>
      mountedRef.current ? dispatch(action) : void 0,
    [mountedRef, dispatch]
  );
};
