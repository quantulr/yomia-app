import {
  Avatar,
  Menu,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import Icon from "@/components/Icon.tsx";
import { BiColumns } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";

import useUserStore from "@/store/user.tsx";

const NavigationBar = () => {
  const logout = useUserStore((state) => state.logout);
  return (
    <div
      className={
        "h-10 shadow-md bg-purple-100 flex items-center justify-between px-4"
      }
    >
      <Icon className={"w-8"} as={<BiColumns />} />
      <Menu>
        <MenuTrigger>
          <Avatar />
        </MenuTrigger>
        <MenuPopover>
          <MenuItem onClick={() => logout()} icon={<IoLogOutOutline />}>
            退出登录
          </MenuItem>
        </MenuPopover>
      </Menu>
    </div>
  );
};

export default NavigationBar;
