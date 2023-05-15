import { create } from "zustand";
import { RouteObject } from "react-router-dom";
import RequiredAuth from "@/components/RequiredAuth.tsx";
import RootLayout from "@/components/RootLayout.tsx";
import UnAuth from "@/components/UnAuth.tsx";
import Login from "@/pages/login.tsx";
import { devtools } from "zustand/middleware";
import { cloneDeep } from "lodash-es";
import { generateRouters } from "@/lib/generateRouters.tsx";
import { ComponentType, lazy, Suspense } from "react";
import { Spinner } from "@fluentui/react-components";

interface RouteStoreType {
  routes: RouteObject[];
  setRoutes: (menuData: any) => void;
}

const pages = import.meta.glob("@/pages/**/*.tsx");

// 路由懒加载
const routerLazyLoadingFn = (
  Element: React.LazyExoticComponent<React.ComponentType<any>>
) => (
  <Suspense fallback={<>loading...</>}>
    <Element />
  </Suspense>
);

export const loadPage = (pagePath: string) => {
  let element;
  for (const path in pages) {
    const dir = path.split("pages/")[1].split(".tsx")[0];
    if (dir === pagePath) {
      element = routerLazyLoadingFn(
        lazy(pages[path] as () => Promise<{ default: ComponentType<any> }>)
      );
    }
  }
  return element;
};
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
            <div
              className={
                "bg-blue-100 w-screen h-screen flex justify-center items-center"
              }
            >
              <Spinner />
            </div>
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
