import { useEffect, useState } from "react";
import {
  GetBookPDFData,
  UpdateLastReaded,
  UpdateProgress,
} from "../../../wailsjs/go/main/App";
import { useParams, useSearchParams } from "react-router-dom";
import PDFViewer from "../../components/PDFViewer";
import useProgress from "../../hooks/useProgress";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";

export default function Read() {
  const { id } = useParams();
  const [pdfBase64, setPDFBase64] = useState("");
  const [page, setPage] = useState(1);
  const [urlSearchParams, _] = useSearchParams();
  const [err, setErr] = useState("");
  const { progress } = useProgress(+(id as string));
  useEffect(() => {
    if (Number.isNaN(id)) return;
    GetBookPDFData(+(id as string))
      .then((pdfData) => {
        setPDFBase64(pdfData);
      })
      .catch((err) => {
        setErr(err);
      });
    UpdateLastReaded(+(id as string));
  }, []);
  useEffect(() => {
    let page = urlSearchParams.get("page");
    if (!page) return;

    if (!Number.isNaN(page)) {
      setPage(+page);
    }
  }, []);
  return (
    <>
      {err && (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-[64px] text-red-600">{err}</h1>
          <button
            className="btn font-bold text-[22px]"
            onClick={() => {
              location.href = `/#/book/${id}`;
            }}
          >
            Return
          </button>
        </div>
      )}
      {!err && (
        <>
          <div className="mt-15">
            <PDFViewer
              scale={+localStorage.readScale || 1}
              onZoomChange={(scale) => {
                localStorage.readScale = scale;
              }}
              onPDFLoaded={(doc: DocumentCallback) => {
                const page = Math.round((doc.numPages / 100) * progress);
                setPage(page);
              }}
              file={pdfBase64}
              pageNumber={page || 1}
              onPageChange={(numPages, pageIndex) => {
                if (Number.isNaN(+(id as string))) return;
                let prog = +(pageIndex / (numPages / 100)).toFixed(2);
                console.log(prog);
                UpdateProgress(+(id as string), prog).catch((err) => {
                  console.log(err);
                });
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
