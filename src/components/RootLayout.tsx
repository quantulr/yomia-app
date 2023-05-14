import { Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar.tsx";

const RootLayout = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
