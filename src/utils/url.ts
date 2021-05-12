import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce((prev: { [key in K]: string }, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
          // eslint-disable-next-line
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{ [k in K]: unknown }>) => {
      let o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};
