import React, { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faAlignRight,
  faAngleLeft,
  faAngleRight,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { useFetcher, useSearchParams } from "react-router-dom";
import { RefProxy } from "pdfjs-dist/types/src/display/api";

interface EditablePdfViewerProps {
  file: string; // base64 encoded PDF file
  pageNumber?: number;
  id?: string;
}

type PDFOutline = {
  title: string;
  bold: boolean;
  italic: boolean;
  color: Uint8ClampedArray;
  dest: string | any[] | null;
  url: string | null;
  unsafeUrl: string | undefined;
  newWindow: boolean | undefined;
  count: number | undefined;
  items: any[];
  pageIndex: number;
};

const EditablePdfViewer: React.FC<EditablePdfViewerProps> = ({
  file,
  pageNumber,
  id,
}) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(pageNumber || 1);
  const [inpPage, setInpPage] = useState(pageNumber || 1);
  const [pdfBlobUrl, setBlobUrl] = useState("");
  const [showChapters, setShowChapters] = useState(false);
  const [pdfOutline, setPdfOutline] = useState<PDFOutline[]>();
  const pagesRef = useRef<HTMLDivElement[]>([]);
  const [urlParams, setUrlParams] = useSearchParams();
  async function onDocumentLoadSuccess(doc: DocumentCallback) {
    let outline = await doc.getOutline();

    setPdfOutline(() => {
      let pdfOutline: PDFOutline[] = [];
      outline.map(async (o) => {
        if (!o.dest) return;
        let pageIndex = (await doc.getPageIndex(o.dest[0] as RefProxy)) || 1;
        pdfOutline.push({ ...o, pageIndex });
      });
      console.log(pdfOutline);
      return pdfOutline;
    });
    setNumPages(doc.numPages);
  }
  const base64toBlob = (base64: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "application/pdf" });
  };
  const changePage = (n: number) => {
    if (!n) {
      setInpPage(0);
      return;
    }
    setInpPage(n);
    setCurrentPage(n);
  };
  const incrementPage = () => {
    if (currentPage === numPages) return;
    setCurrentPage((n) => n + 1);
    setInpPage((n) => n + 1);
  };
  const decrementPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((n) => n - 1);
    setInpPage((n) => n - 1);
  };
  useEffect(() => {
    const blob = base64toBlob(file);
    const blobUrl = URL.createObjectURL(blob);
    setBlobUrl(blobUrl);
    return () => {
      URL.revokeObjectURL(blobUrl);
    };
  }, [numPages, file]);
  useEffect(() => {
    setCurrentPage(pageNumber || 1);
    setInpPage(pageNumber || 1);
  }, [pageNumber]);
  return (
    <>
      <div>
        <div className="fixed items-center w-full h-10 bg-gray top-0 z-10 grid grid-cols-3">
          <div className="ml-3 flex items-center gap-5 h-full">
            <div
              onClick={() => {
                location.href = "/#/book/" + id;
              }}
            >
              <FontAwesomeIcon
                icon={faLeftLong}
                className="h-8 cursor-pointer"
              />
            </div>
            <div className="relative">
              <div
                className=" hover:bg-hover p-2 rounded-md relative cursor-pointer"
                onClick={() => setShowChapters(!showChapters)}
              >
                <FontAwesomeIcon icon={faAlignLeft} className="font-bold h-5" />
              </div>

              {showChapters && (
                <div className=" absolute bg-gray w-[500px] rounded-md flex gap-3 flex-col p-2 translate-y-[10px]">
                  {pdfOutline?.map((chapter, i) => {
                    return (
                      <>
                        <div
                          key={i}
                          onClick={() => {
                            setUrlParams([["page", `${chapter.pageIndex}`]]);
                            changePage(chapter.pageIndex);
                          }}
                          className="cursor-pointer"
                        >
                          <h1>{chapter.title}</h1>
                        </div>
                      </>
                    );
                  })}
                </div>
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
        </div>
        <div
          style={{ height: "100vh", width: "100%", overflowY: "scroll" }}
          className="flex flex-col justify-center mt-16 items-center"
        >
          <Document file={pdfBlobUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <div
              className={"border-black border-2 mb-10"}
              ref={(el) => pagesRef.current.push(el as HTMLDivElement)}
            >
              <Page scale={1} pageNumber={currentPage} />
            </div>
          </Document>
          <div className="flex gap-5">
            <div
              className="bg-gray p-5 rounded-md cursor-pointer"
              onClick={decrementPage}
            >
              <FontAwesomeIcon icon={faAngleLeft} className="h-7 font-bold" />
            </div>
            <div
              className="bg-gray p-5 rounded-md cursor-pointer"
              onClick={incrementPage}
            >
              <FontAwesomeIcon icon={faAngleRight} className="h-7 font-bold" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditablePdfViewer;
