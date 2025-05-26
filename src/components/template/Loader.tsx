import type { ReactNode } from "react";

export const Loader = ({ content }: { content?: string | ReactNode }) => {
  const DefaultLoader = () => {
    return (
      <div className="flex items-center justify-center  h-screen">
        <div className="loader" />
      </div>
    );
  };

  return (
    <div className="items-center justify-center flex flex-1 max-h-screen">
      {content || <DefaultLoader />}
    </div>
  );
};
