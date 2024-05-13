import { useEffect, useState } from "react";
import { OpenImage } from "../../wailsjs/go/main/App";

// Get the img file bytes
export default function useImg(path: string): { imgData: string } {
  const [imgData, setImgData] = useState<string>("");
  const [imgExt, _] = useState<string>(
    path.split("/").at(-1)?.split(".").at(-1) as string
  );
  useEffect(() => {
    const getImgBytes = async () => {
      let imgBytes = await OpenImage(path);
      setImgData(`data:image/${imgExt};base64,${imgBytes}`);
    };
    getImgBytes();
  }, [path]);
  return {
    imgData,
  };
}
