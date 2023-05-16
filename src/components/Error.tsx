import { IconContext } from "react-icons";
import { FcDeleteDatabase } from "react-icons/fc";

const Error = () => {
  return (
    <div
      className={
        "bg-red-200 h-screen w-screen flex justify-center items-center flex-col"
      }
    >
      <IconContext.Provider value={{ className: "w-16 h-16" }}>
        <FcDeleteDatabase />
      </IconContext.Provider>
      <p className={"mt-4"}>没有找到该页面!</p>
    </div>
  );
};

export default Error;
