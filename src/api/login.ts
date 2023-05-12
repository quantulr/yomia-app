import request from "../lib/request.ts";
import { LoginRespType, LoginUserType } from "../types/login.ts";

export const login = (loginUser: LoginUserType) =>
  request.post<never, LoginRespType>("/login", loginUser);

export const fetchRoutes = () => {
  return request.get("/router");
};
