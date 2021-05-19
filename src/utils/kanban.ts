import { useHttp } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "./index";
import { Kanban } from "../type/kanban";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  // 当 param 变化的时候 useQuery 会重新触发
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: cleanObject(param || {}) })
  );
};
