import {
  faAlignLeft,
  faAsterisk,
  faCaretDown,
  faCaretUp,
  faLeftLong,
  faMinus,
  faMoon,
  faPlus,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./style.css"
export default function TopBar({
  outline,
  goBackUrl,
  changePage,
  pageIndex,
  numPages,
  changeScale,
  scale,
  metadata,
  onDarkModeChange,
}: TopBarData) {
  const [showChapters, setShowChapters] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [_, setUrlSearchParams] = useSearchParams();
  const [inpPage, setInpPage] = useState(pageIndex || 1);
  const [darkMode, setDarkMode] = useState<boolean>(!!+localStorage.darkMode);
  useEffect(() => {
    setInpPage(pageIndex);
  }, [pageIndex]);
  const topBarRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
   let lastScrollTop = 0;
   let navbar =  topBarRef.current

    window.addEventListener('scroll', () => {
      if (!navbar) return;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
          // Scroll down
           setShowChapters(false);
           setShowMetadata(false);
          navbar.style.top = '-2.5rem'; // Adjust the value to hide the navbar
          navbar.style.translate = "0% -100%" 
      } else {
        // Scroll up
          navbar.style.top = '2.5rem';
          navbar.style.translate = "0% 0%"
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  }) 
  },[])
  return (
    <>
      <div ref={topBarRef} className="pt-4 pb-4 pl-5 pr-5 sticky duration-200 w-[90%] ml-[50%] translate-x-[-50%] items-center rounded-lg bg-gray top-10 z-10 grid grid-cols-3">
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
              <div className=" absolute top-16 bg-gray w-[500px] max-h-[500px] overflow-scroll rounded-md flex gap-3 flex-col p-2 translate-y-[10px]">
                {outline?.map((chapter, i) => {
                  return (
                    <>
                      <div
                        key={i}
                        onClick={() => {
                          setUrlSearchParams([
                            ["page", `${chapter.pageIndex+1}`],
                          ]);
                          changePage(chapter.pageIndex+1);
                        }}
                        className="cursor-pointer duration-200 pt-2 pl-3 pb-2 hover:bg-hover rounded-md"
                      >
                        <h1 className="cursor-pointer">{i+1}. {chapter.title}</h1>
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
                  <div className="top-16">
                    <h1>No Meta Data</h1>
                  </div>
                )}
                {metadata && (
                  <div className="absolute top-16 bg-gray w-[500px] max-h-[500px] overflow-scroll rounded-md flex gap-3 flex-col p-2 translate-y-[10px]">
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
        <div className="flex justify-center items-center gap-2 h-[70%] ">
          <div className="cursor-pointer" onClick={()=>{
              if (inpPage <= 1)return
              setInpPage(inpPage-1)
              changePage(inpPage-1)
            }}>
            <FontAwesomeIcon icon={faCaretDown} className={"h-6"+(inpPage <= 1 ? " opacity-0 cursor-auto" : "")}/>
          </div>
          <input
            type="number"
            value={inpPage || ""}
            className="inp w-14 text-center page-inp font-bold text-[24px]"
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
          <div className="cursor-pointer" onClick={()=>{
            if (inpPage >= numPages)return
            setInpPage(inpPage+1)
            changePage(inpPage+1)
          }}>
          <FontAwesomeIcon icon={faCaretUp} className={"h-6" + (inpPage >= numPages ? " opacity-0 cursor-auto" : "")}/>
        </div>
        </div>
        <div className="flex justify-center gap-16 items-end">

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
            <h1 className="font-bold text-xl pb-1">{Math.round(scale * 100)}%</h1>
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
          <div className="cursor-pointer pb-[0.15rem]">
            <FontAwesomeIcon
              icon={darkMode ? faSun : faMoon}
              className="h-6"
              onClick={() => {
                setDarkMode(!darkMode);
                if (onDarkModeChange) {
                  onDarkModeChange(!darkMode);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
