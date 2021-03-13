import { useEffect, useState } from "react";

const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
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

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
