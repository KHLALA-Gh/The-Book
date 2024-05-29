import DefaultImg from "../../assets/images/dfbook.png";
import useImg from "../../hooks/useImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

type BookAttr = {
  id: number;
  name: string;
  progress?: number;
  img: string;
  favorite?: boolean;
};

export default function Book({ id, name, img, progress, favorite }: BookAttr) {
  const { imgData } = useImg(img);
  return (
    <>
      <div
        className="bg-gray w-fit pb-7 cursor-pointer relative"
        onClick={() => {
          location.href = `/#/book/${id}`;
        }}
      >
        <img src={imgData.length ? imgData : DefaultImg} alt="" width={226} />
        <div className="mt-3">
          <h1 className="text-center text-[24px] font-bold">
            {name}{" "}
            {favorite && (
              <FontAwesomeIcon
                icon={solidStar}
                className={"h-7 text-yellow-500"}
              />
            )}
          </h1>
          <p className="ml-10 mt-1">
            Progress : {Math.round(progress as number)}%
          </p>
        </div>
      </div>
    </>
  );
}
