import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO: 依赖项里加上 callback 会造成无限循环，这个和 useCallback 以及 useMemo 有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// debounce
// function debounce(func, delay) {
//   let timeout;
//   if (timeout) {
//     clearTimeout(timeout);
//   }
//   timeout = setTimeout(() => func(), delay);
// }
//
// const log = debounce(() => console.log("call"), 5000);
// log();
// log();
// log();

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useDocumentTitle = (title: string, keepOnMount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnMount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnMount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
