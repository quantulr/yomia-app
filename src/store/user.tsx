import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {LoginUserType} from "../types/login.ts";
import {login} from "../api/login.ts";
import {RouteObject} from "react-router-dom";
import RequiredAuth from "../components/RequiredAuth.tsx";
import UnAuth from "../components/UnAuth.tsx";
import Login from "../pages/login.tsx";
import RootLayout from "../components/RootLayout.tsx";

interface UserStoreType {
    token?: string;
    name?: string;
    login: (loginUser: LoginUserType) => Promise<void>;
    router: RouteObject[];
}

const useUserStore = create<UserStoreType>()(
    devtools(
        persist(
            (set) => ({
                token: undefined,
                name: "rer",
                router: [
                    {
                        path: "/",
                        element: (
                            <RequiredAuth>
                                <RootLayout/>
                            </RequiredAuth>
                        ),
                        children: [
                            {path: '', element: <h1>home</h1>}
                        ]
                    },
                    {
                        path: "/login",
                        element: (
                            <UnAuth>
                                <Login/>
                            </UnAuth>
                        ),
                    },
                ],
                login: async (loginUser: LoginUserType) => {
                    const resp = await login(loginUser);
                    set(() => ({
                        token: resp.token,
                    }));
                },
            }),
            {
                name: "user-store",
                partialize: (state) => ({token: state.token}),
            }
        )
    )
);

export default useUserStore;
