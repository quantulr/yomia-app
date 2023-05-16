import { create } from "zustand";
import { MenuData } from "@/types/router.ts";

interface MenuStoreType {
  menus: MenuData[];
  setMenus: (routesData: MenuData[]) => void;
}

const useMenuStore = create<MenuStoreType>()((set) => ({
  menus: [],
  setMenus: (routesData) => set(() => ({ menus: routesData })),
}));
export default useMenuStore;
