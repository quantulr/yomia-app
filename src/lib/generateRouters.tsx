import { MenuData } from "@/types/router";
import { RouteObject } from "react-router-dom";

export const generateRouters = (routerDatas: MenuData[]): RouteObject[] => {
  const _routes = flatRoutesPath(routerDatas);
  _routes.push({
    path: "*",
    element: <div>404 not found!!</div>,
  });
  return _routes.map((el) =>
    el.path?.startsWith("/") ? { ...el, path: el.path?.slice(1) } : el
  );
};

/**
 * 生成扁平的路由列表
 * @param paths
 * @param parentPath
 */
const flatRoutesPath = (paths: MenuData[], parentPath = "") =>
  paths.reduce((result: RouteObject[], item) => {
    const path = parentPath ? `${parentPath}/${item.path}` : item.path;
    if (item.children) {
      result.push(...flatRoutesPath(item.children, path));
    } else {
      result.push({ path: path, element: <div>{path.slice(1)}</div> });
    }
    return result;
  }, []);
