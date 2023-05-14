import { create } from "zustand";
import { MenuData } from "@/types/router.ts";
import { devtools } from "zustand/middleware";

interface MenuStoreType {
  menus: MenuData[];
  setMenus: (routesData: MenuData[]) => void;
}

const useMenuStore = create<MenuStoreType>()(
  devtools((set) => ({
    menus: [],
    setMenus: (routesData) => set(() => ({ menus: routesData })),
  }))
);
export default useMenuStore;
