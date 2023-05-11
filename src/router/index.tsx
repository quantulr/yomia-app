import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import Login from "../pages/login.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    }, {
        path: '/login', element: <Login/>
    }
])

export default router