import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useSWR from "swr";
import request from "./lib/request.ts";
import useUserStore from "./store/user.tsx";
import useRoutesStore from "@/store/routes.tsx";
import useMenuStore from "@/store/menu.tsx";
import Loading from "@/components/Loading.tsx";
import { useState } from "react";
import Error from "@/components/Error.tsx";

const fetcher = (url: string) => request.get(url);

function App() {
  const token = useUserStore((state) => state.token);

  const routes = useRoutesStore((state) => state.routes);
  const setRoutes = useRoutesStore((state) => state.setRoutes);

  const setMenus = useMenuStore((state) => state.setMenus);

  const [isRoutesLoaded, setIsRouteLoaded] =
    useState(false); /*路由信息是否加载完成*/

  const { data: userInfoData } = useSWR(token ? "/getInfo" : null, fetcher, {
    onSuccess(data) {
      // TODO: 存储用户信息
      console.log(data);
    },
  });

  const { isLoading: isRouterLoading, error: routesError } = useSWR(
    userInfoData ? "/getRouters" : null,
    fetcher,
    {
      onSuccess: (data) => {
        setRoutes(data.data);
        setMenus(data.data);
        setIsRouteLoaded(() => true);
      },
    }
  );
  if (routesError) return <Error />;
  if (isRouterLoading) return <Loading />;
  return isRoutesLoaded ? (
    <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
  ) : (
    <Loading />
  );
}

export default App;
