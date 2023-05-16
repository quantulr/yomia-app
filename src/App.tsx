import "./App.css";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import useSWR from "swr";
import request from "./lib/request.ts";
import useUserStore from "./store/user.tsx";
import useRoutesStore from "@/store/routes.tsx";
import useMenuStore from "@/store/menu.tsx";
import Loading from "@/components/Loading.tsx";
import {useState} from "react";
import Error from "@/components/Error.tsx";

const fetcher = (url: string) => request.get(url);

function App() {
    const token = useUserStore((state) => state.token);
    const routes = useRoutesStore((state) => state.routes);
    const setRoutes = useRoutesStore((state) => state.setRoutes);

    const setMenus = useMenuStore((state) => state.setMenus);

    const [isRoutesLoaded, setIsRouteLoaded] =
        useState(false); /*路由信息是否加载完成*/

    const {data: userInfoData, error: userInfoError} = useSWR(
        token ? "/getInfo" : null,
        (url: string) => request.get(url),
        {
            onSuccess(data) {
                // TODO: 存储用户信息
                console.log(data);
            },
            revalidateOnFocus: false
        }
    );

    const {error: routesError} = useSWR(
        userInfoData ? "/getRouters" : null,
        fetcher,
        {
            onSuccess: (data) => {
                setRoutes(data.data);
                setMenus(data.data);
                setIsRouteLoaded(() => true);
            },
            revalidateOnFocus: false
        }
    );
    /*没有token, 直接返回初始的router provider*/
    if (!token)
        return (
            <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
        );
    /*信息请求出错, 返回'错误'页面*/
    if (userInfoError || routesError) return <Error/>;
    if (!isRoutesLoaded) return <Loading/>;
    return <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>;
}

export default App;
