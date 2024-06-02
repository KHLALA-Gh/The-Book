import { useState } from "react";
import { AskForBookImage } from "../../../wailsjs/go/main/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function ImgInput({
  value,
  onFileSelected,
  onError,
  onSelecting,
  title,
}: ImgInput) {
  const [image, setImg] = useState(value);
  const [err, setErr] = useState("");

  const getImg = async () => {
    try {
      if (onSelecting) {
        onSelecting();
      }
      let img = await AskForBookImage();
      setImg(img);
      if (onFileSelected) {
        onFileSelected(img);
      }
    } catch (err) {
      setErr("Unable to get the file path");
      if (onError) {
        onError(err);
      }
    }
  };
  return (
    <>
      {!image && (
        <div
          className="file-input w-[400px] flex justify-center flex-col items-center gap-3"
          onClick={getImg}
        >
          <p className="text-light">{title || "Book image"}</p>
          <div className="w-[109px] h-[109px] border-2 border-light"></div>
          <p className="text-light">667x1000</p>
        </div>
      )}
      {image && (
        <div
          onClick={getImg}
          className="cursor-pointer border-4 border-black p-3 flex items-center gap-7 w-[400px]"
        >
          <FontAwesomeIcon icon={faImage} className="h-[24px]" />
          <h1 className="font-bold text-xl">{image.replace(/^.*[\\/]/, "")}</h1>
        </div>
      )}
    </>
  );
}
