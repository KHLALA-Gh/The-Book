import {
  IconDefinition,
  faBook,
  faHouse,
  faPlus,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type Button = {
  name: string;
  pathName: string;
  icon: IconDefinition;
  redirectTo: string;
};

const btns: Button[] = [
  {
    name: "Store",
    pathName: "store",
    icon: faStore,
    redirectTo: "/#/store",
  },
  {
    name: "Home",
    pathName: "home",
    icon: faHouse,
    redirectTo: "/#/home",
  },
  {
    name: "Library",
    pathName: "library",
    icon: faBook,
    redirectTo: "/#/library",
  },
  {
    name: "New",
    pathName: "new_book",
    icon: faPlus,
    redirectTo: "/#/new_book",
  },
];

export default function Bar() {
  const [selectedBtn, setSlctdBtn] = useState("wa");
  useEffect(() => {
    setSlctdBtn(location.href.split("/")[4]);
  }, []);
  return (
    <>
      <div className="w-[120px] rounded-l-md shadow-2xl h-screen fixed z-10">
        <div className="mt-20 flex flex-col gap-16">
          {btns.map((btn, i) => {
            return (
              <>
                <div
                  onClick={() => {
                    location.href = btn.redirectTo;
                  }}
                  key={i}
                  className="flex flex-col items-center relative cursor-pointer"
                >
                  <FontAwesomeIcon icon={btn.icon} className="h-[55px]" />

                  <h1 className="mt-4 font-bold">{btn.name}</h1>
                  {selectedBtn == btn.pathName && (
                    <div className="absolute h-full w-[8px] bg-black rounded-r-md left-0"></div>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
