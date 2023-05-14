import useMenuStore from "@/store/menu.tsx";

const SideBar = () => {
  const menus = useMenuStore((state) => state.menus);
  return (
    <div className={"w-1/6 bg-teal-50 h-screen"}>
      <ul className={"menu-list"}>
        {menus.map((el) => (
          <li key={el.path}>{el.meta.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
