import { useHttp } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "./index";
import { Task } from "../type/task";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  // 当 param 变化的时候 useQuery 会重新触发
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: cleanObject(param || {}) })
  );
};
