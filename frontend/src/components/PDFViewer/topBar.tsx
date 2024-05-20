import {
  faAlignLeft,
  faAsterisk,
  faFile,
  faL,
  faLeftLong,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function TopBar({
  outline,
  goBackUrl,
  changePage,
  pageIndex,
  numPages,
  changeScale,
  scale,
  metadata,
}: TopBarData) {
  const [showChapters, setShowChapters] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [_, setUrlSearchParams] = useSearchParams();
  const [inpPage, setInpPage] = useState(pageIndex || 1);
  useEffect(() => {
    setInpPage(pageIndex);
  }, [pageIndex]);
  return (
    <>
      <div className="fixed items-center w-full h-10 bg-gray top-0 z-10 grid grid-cols-3">
        <div className="ml-3 flex items-center gap-5 h-full">
          <div
            title="leave the reader"
            onClick={() => {
              location.href = goBackUrl || "/#/home";
            }}
          >
            <FontAwesomeIcon icon={faLeftLong} className="h-8 cursor-pointer" />
          </div>
          <div className="relative">
            <div
              title="Book Outline"
              className=" hover:bg-hover p-2 rounded-md relative cursor-pointer"
              onClick={() => {
                setShowChapters(!showChapters);
                setShowMetadata(false);
              }}
            >
              <FontAwesomeIcon icon={faAlignLeft} className="font-bold h-5" />
            </div>

            {showChapters && (
              <div className=" absolute bg-gray w-[500px] rounded-md flex gap-3 flex-col p-2 translate-y-[10px]">
                {outline?.map((chapter, i) => {
                  return (
                    <>
                      <div
                        key={i}
                        onClick={() => {
                          setUrlSearchParams([
                            ["page", `${chapter.pageIndex}`],
                          ]);
                          changePage(chapter.pageIndex);
                        }}
                        className="cursor-pointer"
                      >
                        <h1>{chapter.title}</h1>
                      </div>
                    </>
                  );
                })}
                {!outline ||
                  (!outline?.length && (
                    <div className="text-center">
                      <h1>No available outline</h1>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="relative">
            <div
              title="MetaData"
              className="hover:bg-hover p-2 rounded-md relative cursor-pointer"
              onClick={() => {
                setShowChapters(false);
                setShowMetadata(!showMetadata);
              }}
            >
              <FontAwesomeIcon icon={faAsterisk} className="h-5" />
            </div>
            {showMetadata && (
              <>
                {!metadata && (
                  <div>
                    <h1>No Meta Data</h1>
                  </div>
                )}
                {metadata && (
                  <div className="absolute bg-gray w-[500px] rounded-md flex gap-3 flex-col p-2 translate-y-[10px]">
                    <h1>Title : {metadata.Title}</h1>
                    <h1>Author : {metadata.Author}</h1>
                    <h1>Creator : {metadata.Creator}</h1>
                    <h1>Pages : {metadata.PageCount}</h1>
                    <h1>
                      Creation Date :{" "}
                      {new Date(metadata.CreationDate).toLocaleDateString()}
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center h-[70%] ">
          <input
            type="number"
            value={inpPage || ""}
            className="inp w-[100px] text-center"
            onChange={(e) => {
              if (0 <= +e.target.value && +e.target.value <= numPages) {
                setInpPage(+e.target.value);
              }
            }}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                changePage(inpPage);
              }
            }}
            onBlur={() => {
              changePage(inpPage);
            }}
          />
        </div>
        <div className="flex justify-center gap-10 items-end">
          <div className="flex items-center gap-3">
            <div
              title="zoom out"
              onClick={() => {
                if (scale <= 0.4) return;
                changeScale(scale - 0.1);
              }}
            >
              <FontAwesomeIcon icon={faMinus} className="h-5 cursor-pointer" />
            </div>
            <h1>Scale : {Math.round(scale * 100)}%</h1>
            <div
              title="zoom in"
              onClick={() => {
                if (scale >= 2.9) return;
                changeScale(scale + 0.1);
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="h-5 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
