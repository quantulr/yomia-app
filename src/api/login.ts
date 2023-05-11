import request from '../lib/request.ts'
import {LoginUserType} from "../types/login.ts";


export const login = (loginUser: LoginUserType) => request.post<never, any>('/login', loginUser,)
