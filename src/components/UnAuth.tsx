import { ReactNode } from "react";
import useUserStore from "../store/user.tsx";
import { Navigate } from "react-router-dom";

const UnAuth = ({ children }: { children: ReactNode }) => {
  const token = useUserStore((state) => state.token);
  if (token) {
    return <Navigate to={"/"} />;
  }
  return <>{children}</>;
};

export default UnAuth;
