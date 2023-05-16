export interface RyResponse<T> {
  msg: string;
  code: number;
  data?: T;
}
