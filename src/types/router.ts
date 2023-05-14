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
  children?: Children[];
}

export interface Meta {
  title: string;
  icon: string;
  noCache: boolean;
  link?: string;
}

export interface Children {
  name: string;
  path: string;
  hidden: boolean;
  component: string;
  meta: Meta;
  redirect?: string;
  alwaysShow?: boolean;
  children?: Children[];
}
