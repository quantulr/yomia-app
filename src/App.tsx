import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import useSWR from "swr";
import request from "./lib/request.ts";
import useUserStore from "./store/user.tsx";

const fetcher = (url: string) => request.get(url);

function App() {
    const token = useUserStore((state) => state.token);
    const router = useUserStore((state) => state.router);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {data, isLoading} = useSWR(token ? "/getRouters" : null, fetcher, {
        onSuccess: (data) => {
            console.log(data);
            console.log("get routes success");
        },
    });

    return <>
        {isLoading ? <div>loading</div> :
            <RouterProvider router={createBrowserRouter(router)}></RouterProvider>}</>

}

export default App;
