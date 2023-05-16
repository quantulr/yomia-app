import { IconContext } from "react-icons";
import { ReactNode } from "react";

const Icon = ({
  as,
  className,
  onClick,
}: {
  as: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div onClick={onClick} className={"cursor-pointer"}>
      <IconContext.Provider value={{ className }}>{as}</IconContext.Provider>
    </div>
  );
};

export default Icon;
