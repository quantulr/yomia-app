import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginUserType } from "@/types/login.ts";
import { login } from "@/api/login.ts";
import { RouteObject } from "react-router-dom";
import RequiredAuth from "@/components/RequiredAuth.tsx";
import UnAuth from "@/components/UnAuth.tsx";
import Login from "@/pages/login.tsx";
import RootLayout from "@/components/RootLayout.tsx";

export type ExtendsRouteObject = RouteObject & {
  meta?: any;
  children?: ExtendsRouteObject[];
};

interface UserStoreType {
  token?: string;
  name?: string;
  login: (loginUser: LoginUserType) => Promise<void>;
  logout: () => Promise<void>;
  router: ExtendsRouteObject[];
}

const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      token: undefined,
      name: "rer",
      router: [
        {
          path: "/",
          element: (
            <RequiredAuth>
              <RootLayout />
            </RequiredAuth>
          ),
          meta: { label: "" },
          children: [{ path: "", element: <h1>home</h1> }],
        },
        {
          path: "/login",
          element: (
            <UnAuth>
              <Login />
            </UnAuth>
          ),
        },
        {
          path: "*",
          element: (
            <RequiredAuth>
              <div>before load route</div>
            </RequiredAuth>
          ),
        },
      ],
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
);

export default useUserStore;
