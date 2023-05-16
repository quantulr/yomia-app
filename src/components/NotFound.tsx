import useUserStore from "@/store/user.tsx";
import { Navigate } from "react-router-dom";
import { FcQuestions } from "react-icons/fc";
import { IconContext } from "react-icons";

const NotFound = () => {
  const token = useUserStore((state) => state.token);
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div
      className={
        "bg-blue-100 h-screen w-screen flex justify-center items-center flex-col"
      }
    >
      <IconContext.Provider value={{ className: "w-16 h-16" }}>
        <FcQuestions />
      </IconContext.Provider>
      <p className={"mt-4"}>没有找到该页面!</p>
    </div>
  );
};

export default NotFound;
