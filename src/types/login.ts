export interface LoginUserType {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

export interface LoginRespType {
  msg: string;
  code: number;
  token: string;
}
