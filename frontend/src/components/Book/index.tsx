import { useEffect, useState } from "react";
import { OpenImage } from "../../../wailsjs/go/main/App";
import DefaultImg from "../../assets/images/dfbook.png";

type BookAttr = {
  id: number;
  name: string;
  progress?: number;
  img: string;
};

export default function Book({ id, name, img, progress }: BookAttr) {
  const [imgData, setImgData] = useState<string>("");
  const [imgExt, _] = useState<string>(
    img.split("/").at(-1)?.split(".").at(-1) as string
  );
  useEffect(() => {
    OpenImage(img).then((imgBytes) => {
      setImgData(`data:image/${imgExt};base64,${imgBytes}`);
    });
  });
  return (
    <>
      <div className="bg-gray w-fit pb-7 cursor-pointer">
        <img src={imgData.length ? imgData : DefaultImg} alt="" width={226} />
        <div className="mt-3">
          <h1 className="text-center text-[24px] font-bold">{name}</h1>
          <p className="ml-10 mt-1">Progress : {progress}%</p>
        </div>
      </div>
    </>
  );
}
