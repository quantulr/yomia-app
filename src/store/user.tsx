import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LoginUserType } from "@/types/login.ts";
import { login } from "@/api/login.ts";
import { RouteObject } from "react-router-dom";

export type ExtendsRouteObject = RouteObject & {
  meta?: any;
  children?: ExtendsRouteObject[];
};

interface UserStoreType {
  token?: string;
  name?: string;
  login: (loginUser: LoginUserType) => Promise<void>;
  logout: () => Promise<void>;
}

const useUserStore = create<UserStoreType>()(
  devtools(
    persist(
      (set) => ({
        token: undefined,
        name: "rer",
        login: async (loginUser: LoginUserType) => {
          const resp = await login(loginUser);
          set(() => ({
            token: resp.token,
          }));
        },
        logout: async () => {
          set(() => ({ token: undefined }));
        },
      }),
      {
        name: "user-store",
        partialize: (state) => ({ token: state.token }),
      }
    )
  )
);

export default useUserStore;
