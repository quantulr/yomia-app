import { ReactNode } from "react";
import useUserStore from "../store/user.tsx";
import { Navigate } from "react-router-dom";

const RequiredAuth = ({ children }: { children: ReactNode }) => {
  const token = useUserStore((state) => state.token);
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return <>{children}</>;
};

export default RequiredAuth;
