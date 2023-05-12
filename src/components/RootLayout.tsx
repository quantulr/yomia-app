import useSWR from "swr";
import {Outlet} from "react-router-dom";
import request from "../lib/request.ts";

const fetcher = (url: string) => request.get(url)
const RootLayout = () => {
    const {data} = useSWR('/getInfo', fetcher)

    return (
        <>
            <Outlet/>
        </>
    );
};

export default RootLayout;