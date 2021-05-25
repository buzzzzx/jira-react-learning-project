import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "./index";
import { Kanban } from "../type/kanban";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-udpate";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  // 当 param 变化的时候 useQuery 会重新触发
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: cleanObject(param || {}) })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Kanban>) =>
      client("kanbans", {
        data: param,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useEditKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Kanban>) =>
      client(`kanbans/${param.id}`, {
        data: param,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export interface SortProps {
  // 需要移动的 Item
  fromId: number;
  // 移动到的目标位置
  referenceId: number;
  // 目标位置的前后
  type: "after" | "before";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};
