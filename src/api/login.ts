import request from "../lib/request.ts";
import { LoginRespType, LoginUserType } from "../types/login.ts";

export const login = (loginUser: LoginUserType) =>
  request.post<never, LoginRespType>("/login", loginUser);

export const logout = () => request.get("/logout");

export const fetchRoutes = () => {
  return request.get("/router");
};
