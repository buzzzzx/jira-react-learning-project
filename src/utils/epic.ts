import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "./index";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-udpate";
import { Epic } from "../type/epic";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  // 当 param 变化的时候 useQuery 会重新触发
  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", { data: cleanObject(param || {}) })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Epic>) =>
      client("epics", {
        data: param,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useEditEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Epic>) =>
      client(`epics/${param.id}`, {
        data: param,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};
