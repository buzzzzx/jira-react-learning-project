import { cleanObject } from "./index";
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { User } from "../type/user";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  // 当 param 变化的时候 useQuery 会重新触发
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: cleanObject(param || {}) })
  );
};
