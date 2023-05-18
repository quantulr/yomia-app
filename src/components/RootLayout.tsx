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
import NavigationBar from "@/components/NavigationBar.tsx";
import { FcHome } from "react-icons/fc";

const SideMenuItem = ({
  menu,
  path,
  intend = 0,
}: {
  menu: MenuData;
  path?: string;
  intend?: number;
}) => {
  const navigate = useNavigate();
  if (menu.children) {
    return (
      <SubMenu
        rootStyles={{ paddingLeft: `${20 * intend}px` }}
        label={menu.meta.title}
      >
        {menu.children.map((el) => (
          <SideMenuItem
            intend={intend + 1}
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
        rootStyles={{ paddingLeft: `${20 * intend}px` }}
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
        <Sidebar className={"shadow-md"}>
          <OverlayScrollbarsComponent
            style={{ height: "100vh" }}
            options={{
              scrollbars: { theme: "os-theme-dark", autoHide: "leave" },
            }}
            defer
          >
            {/*<div className={'h-8 flex'}></div>*/}
            <Menu
              menuItemStyles={{
                button: ({ level, isSubmenu }) => {
                  console.log(level, isSubmenu);
                  return {
                    backgroundColor: isSubmenu ? "#fbfbfb" : undefined,
                  };
                },
              }}
            >
              <MenuItem
                icon={<FcHome />}
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
          <NavigationBar></NavigationBar>
          <OverlayScrollbarsComponent
            style={{ height: "calc(100vh - 40px)", padding: "20px" }}
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
