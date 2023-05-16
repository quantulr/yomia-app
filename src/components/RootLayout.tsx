import { Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuItem,
  ProSidebarProvider,
  Sidebar,
  SubMenu,
} from "react-pro-sidebar";
import useMenuStore from "@/store/menu.tsx";
import { MenuData } from "@/types/router.ts";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const SideMenuItem = ({ menu, path }: { menu: MenuData; path?: string }) => {
  const navigate = useNavigate();
  if (menu.children) {
    return (
      <SubMenu label={menu.meta.title}>
        {menu.children.map((el) => (
          <SideMenuItem
            path={path ? `${path}/${el.path}` : `${menu.path}/${el.path}`}
            menu={el}
            key={el.path}
          />
        ))}
      </SubMenu>
    );
  } else {
    return (
      <MenuItem
        onClick={() => {
          console.log(path ? path : menu.path);
          const route_path = path ? path : menu.path;
          if (
            route_path.startsWith("https://") ||
            route_path.startsWith("http://")
          ) {
            window.open(route_path, "_blank");
          } else {
            navigate(route_path);
          }
        }}
      >
        {menu.meta.title}
      </MenuItem>
    );
  }
};

const RootLayout = () => {
  const navigate = useNavigate();
  const menus = useMenuStore((state) => state.menus);
  return (
    <div className={"h-screen w-screen flex"}>
      <ProSidebarProvider>
        <Sidebar>
          <OverlayScrollbarsComponent
            style={{ height: "100vh" }}
            options={{
              scrollbars: { theme: "os-theme-dark", autoHide: "leave" },
            }}
            defer
          >
            <Menu>
              <MenuItem
                onClick={() => {
                  navigate("/");
                }}
              >
                首页
              </MenuItem>
              {menus.map((el) => (
                <SideMenuItem key={el.path} menu={el} />
              ))}
            </Menu>
          </OverlayScrollbarsComponent>
        </Sidebar>
        <main className={"w-full"}>
          <OverlayScrollbarsComponent
            style={{ height: "100vh", padding: "20px" }}
            options={{
              scrollbars: { theme: "os-theme-dark", autoHide: "leave" },
            }}
            defer
          >
            <Outlet />
          </OverlayScrollbarsComponent>
        </main>
      </ProSidebarProvider>
    </div>
  );
};

export default RootLayout;
