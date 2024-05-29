import React, { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { RefProxy } from "pdfjs-dist/types/src/display/api";
import TopBar from "./topBar";
import usePDFMetadata from "../../hooks/usePDFMetadata";

const EditablePdfViewer: React.FC<EditablePdfViewerProps> = ({
  file,
  pageNumber,
  onPageChange,
  onPDFLoaded,
  onZoomChange,
  scale: sc,
}) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(pageNumber || 1);
  const [scale, setScale] = useState(sc || 1);
  const [pdfBlobUrl, setBlobUrl] = useState("");
  const [pdfOutline, setPdfOutline] = useState<PDFOutline[]>();
  const pagesRef = useRef<HTMLDivElement[]>([]);
  const { metadata } = usePDFMetadata(file);

  //const [metadata, setMetadata] = useState<BookMetaData>();
  async function onDocumentLoadSuccess(doc: DocumentCallback) {
    let outline = await doc.getOutline();
    setPdfOutline(() => {
      let pdfOutline: PDFOutline[] = [];
      outline.map(async (o) => {
        if (!o.dest) return;
        let pageIndex = (await doc.getPageIndex(o.dest[0] as RefProxy)) || 1;
        pdfOutline.push({ ...o, pageIndex });
      });
      return pdfOutline;
    });
    setNumPages(doc.numPages);
    if (typeof onPDFLoaded !== "function") return;
    onPDFLoaded(doc);
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
      return;
    }
    setCurrentPage(n);
  };
  const incrementPage = () => {
    if (currentPage === numPages) return;
    setCurrentPage((n) => n + 1);
  };
  const decrementPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((n) => n - 1);
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
  }, [pageNumber]);
  useEffect(() => {
    if (typeof onPageChange === "function") {
      onPageChange(numPages, currentPage as number);
    }
  }, [currentPage]);
  useEffect(() => {
    if (typeof onZoomChange !== "function") return;
    onZoomChange(scale);
  }, [scale]);
  return (
    <>
      <div>
        <TopBar
          outline={pdfOutline}
          pageIndex={currentPage}
          numPages={numPages}
          changePage={changePage}
          scale={scale}
          changeScale={(n) => setScale(n)}
          metadata={metadata}
        />
        <div
          style={{ height: "100vh", width: "100%", overflowY: "scroll" }}
          className="flex flex-col justify-center mt-16 items-center"
        >
          <Document file={pdfBlobUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <div
              className={"border-black border-2 mb-10"}
              ref={(el) => pagesRef.current.push(el as HTMLDivElement)}
            >
              <Page scale={scale} pageNumber={currentPage} />
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
