import { create } from "zustand";
import { RouteObject } from "react-router-dom";
import RequiredAuth from "@/components/RequiredAuth.tsx";
import RootLayout from "@/components/RootLayout.tsx";
import UnAuth from "@/components/UnAuth.tsx";
import Login from "@/pages/login.tsx";
import { cloneDeep } from "lodash-es";
import { generateRouters } from "@/lib/routes.tsx";
import NotFound from "@/components/NotFound.tsx";
import Home from "@/pages/home.tsx";

interface RouteStoreType {
  routes: RouteObject[];
  setRoutes: (menuData: any) => void;
}

const useRoutesStore = create<RouteStoreType>()((set) => ({
  routes: [
    {
      path: "/",
      element: (
        <RequiredAuth>
          <RootLayout />
        </RequiredAuth>
      ),
      children: [{ path: "", element: <Home /> }],
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
      element: <NotFound />,
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
}));

export default useRoutesStore;
