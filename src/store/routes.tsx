import { create } from "zustand";
import { RouteObject } from "react-router-dom";
import RequiredAuth from "@/components/RequiredAuth.tsx";
import RootLayout from "@/components/RootLayout.tsx";
import UnAuth from "@/components/UnAuth.tsx";
import Login from "@/pages/login.tsx";
import { devtools } from "zustand/middleware";
import { cloneDeep } from "lodash-es";
import { generateRouters } from "@/lib/generateRouters.tsx";

interface RouteStoreType {
  routes: RouteObject[];
  setRoutes: (menuData: any) => void;
}

const useRoutesStore = create<RouteStoreType>()(
  devtools((set) => ({
    routes: [
      {
        path: "/",
        element: (
          <RequiredAuth>
            <RootLayout />
          </RequiredAuth>
        ),
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
    setRoutes: (menuData: any) =>
      set((state) => {
        const _routes = cloneDeep(state.routes);
        const remoteMenus = generateRouters(menuData);
        _routes[0].children?.push(...remoteMenus);
        return {
          routes: _routes,
        };
      }),
  }))
);

export default useRoutesStore;
