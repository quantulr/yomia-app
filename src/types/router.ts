// export interface Root {
//   msg: string;
//   code: number;
//   data: Daum[];
// }

export interface MenuData {
  name: string;
  path: string;
  hidden: boolean;
  redirect?: string;
  component: string;
  alwaysShow?: boolean;
  meta: Meta;
  children?: MenuData[];
}

export interface Meta {
  title: string;
  icon: string;
  noCache: boolean;
  link?: string;
}
