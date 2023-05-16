export interface MenuItem {
  createBy: any;
  createTime: string;
  updateBy: any;
  updateTime: any;
  remark: any;
  menuId: number;
  menuName: string;
  parentName: any;
  parentId: number;
  orderNum: number;
  path: string;
  component?: string;
  query: string;
  isFrame: string;
  isCache: string;
  menuType: string;
  visible: string;
  status: string;
  perms: string;
  icon: string;
  children: MenuItem[];
  treeLevel?: number;
}
