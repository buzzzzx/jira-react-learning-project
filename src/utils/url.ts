import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject, subset } from "./index";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlQueryParam();

  return [
    useMemo(
      () =>
        // eslint-disable-next-line
        subset(Object.fromEntries(searchParams), keys) as {
          [key in K]: string;
        },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [k in K]: unknown }>) => setSearchParams(params),
  ] as const;
};

export const useSetUrlQueryParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    let o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};
