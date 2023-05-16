import { Spinner } from "@fluentui/react-components";

const Loading = () => {
  return (
    <div
      className={
        "h-screen w-screen flex justify-center items-center bg-blue-100"
      }
    >
      <Spinner />
    </div>
  );
};

export default Loading;
