import { MenuData } from "@/types/router";
import { RouteObject } from "react-router-dom";

import { ComponentType, lazy, Suspense } from "react";

const pages = import.meta.glob("@/pages/**/*.tsx");

export const loadPage = (pagePath: string) => {
  let element;
  for (const path in pages) {
    const dir = path.split("pages/")[1].split(".tsx")[0];
    if (dir === pagePath) {
      element = routerLazyLoadingFn(
        lazy(pages[path] as () => Promise<{ default: ComponentType<any> }>)
      );
    }
  }
  return element;
};

// 路由懒加载
const routerLazyLoadingFn = (
  Element: React.LazyExoticComponent<React.ComponentType<any>>
) => (
  <Suspense fallback={<></>}>
    <Element />
  </Suspense>
);

export const generateRouters = (routerDatas: MenuData[]): RouteObject[] => {
  const _routes = flatRoutesPath(routerDatas);
  // _routes.push({
  //   path: "*",
  //   element: <div>404 not found!!</div>,
  // });
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
      result.push({ path: path, element: loadPage(item.component) });
    }
    return result;
  }, []);
