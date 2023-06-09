import useSWR from "swr";
import request from "@/lib/request.ts";
import { RyResponse } from "@/types/response.ts";
import { MenuItem } from "@/types/menu.ts";

export const useMenus = ({
  rootId,
  onSuccess,
}: {
  rootId?: number;
  onSuccess?: (data: RyResponse<MenuItem[]>) => void;
}): {
  menus?: RyResponse<MenuItem[]>;
  isLoading: boolean;
  isError: Error;
} => {
  const fetcher = (url: string) =>
    request.get<never, RyResponse<MenuItem[]>>(url);
  const { data, isLoading, error } = useSWR(
    rootId ? `/system/menu/list` : "/system/menu/list",
    fetcher,
    {
      onSuccess,
      revalidateOnFocus: false,
    }
  );
  return {
    menus: data,
    isLoading,
    isError: error,
  };
};
