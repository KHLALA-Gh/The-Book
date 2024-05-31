import { ReactNode } from "react";

interface PopUpArgs {
  title: string;
  description?: string;
  buttons: ReactNode[];
  onClickBackground?: () => void;
}

export default function PopUp({
  title,
  description,
  buttons,
  onClickBackground,
}: PopUpArgs) {
  return (
    <>
      <div
        onClick={onClickBackground}
        className="w-full h-full bg-light absolute top-0 left-0 z-[1000]"
      ></div>
      <div className="absolute bg-white left-[50%] top-[50%] z-[1000] translate-x-[-50%] translate-y-[-50%] border-4 border-black p-5 rounded-lg">
        <h1 className="text-center text-[28px] font-bold">{title}</h1>
        <p className="text-light">{description}</p>
        <div className="flex gap-5 justify-center mt-5">
          {buttons.map((btn, i) => {
            return <div key={i}>{btn}</div>;
          })}
        </div>
      </div>
    </>
  );
}
