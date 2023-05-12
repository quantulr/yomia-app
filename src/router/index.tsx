import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login.tsx";
import RequiredAuth from "../components/RequiredAuth.tsx";
import UnAuth from "../components/UnAuth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequiredAuth>
        <h1>home</h1>
      </RequiredAuth>
    ),
  },
  {
    path: "/login",
    element: (
      <UnAuth>
        <Login />
      </UnAuth>
    ),
  },
]);

export default router;
