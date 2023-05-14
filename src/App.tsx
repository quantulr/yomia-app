import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useSWR from "swr";
import request from "./lib/request.ts";
import useUserStore from "./store/user.tsx";
import useRoutesStore from "@/store/routes.tsx";
import { Spinner } from "@fluentui/react-components";
import useMenuStore from "@/store/menu.tsx";

const fetcher = (url: string) => request.get(url);

function App() {
  const token = useUserStore((state) => state.token);
  const routes = useRoutesStore((state) => state.routes);

  const setRoutes = useRoutesStore((state) => state.setRoutes);
  const setMenus = useMenuStore((state) => state.setMenus);
  const { data: userInfoData } = useSWR(token ? "/getInfo" : null, fetcher, {
    onSuccess(data) {
      console.log(data);
    },
  });
  const { isLoading: isRouterLoading } = useSWR(
    userInfoData ? "/getRouters" : null,
    fetcher,
    {
      onSuccess: (data) => {
        setRoutes(data.data);
        setMenus(data.data);
      },
    }
  );

  return (
    <>
      {isRouterLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
      )}
    </>
  );
}

export default App;
