import { useEffect, useState } from "react";
import { OpenImage } from "../../../wailsjs/go/main/App";
import DefaultImg from "../../assets/images/dfbook.png";
import useImg from "../../hooks/useImage";

type BookAttr = {
  id: number;
  name: string;
  progress?: number;
  img: string;
};

export default function Book({ id, name, img, progress }: BookAttr) {
  const { imgData } = useImg(img);
  return (
    <>
      <div
        className="bg-gray w-fit pb-7 cursor-pointer"
        onClick={() => {
          location.href = `/#/book/${id}`;
        }}
      >
        <img src={imgData.length ? imgData : DefaultImg} alt="" width={226} />
        <div className="mt-3">
          <h1 className="text-center text-[24px] font-bold">{name}</h1>
          <p className="ml-10 mt-1">
            Progress : {Math.round(progress as number)}%
          </p>
        </div>
      </div>
    </>
  );
}
