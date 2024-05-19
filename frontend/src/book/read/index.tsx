import { useEffect, useState } from "react";
import { GetBookPDFData } from "../../../wailsjs/go/main/App";
import { useParams, useSearchParams } from "react-router-dom";
import PDFViewer from "../../components/PDFViewer";

export default function Read() {
  const { id } = useParams();
  const [pdfBase64, setPDFBase64] = useState("");
  const [page, setPage] = useState(1);
  const [urlSearchParams, _] = useSearchParams();
  const [err, setErr] = useState("");
  useEffect(() => {
    if (Number.isNaN(id)) return;
    GetBookPDFData(+(id as string))
      .then((pdfData) => {
        setPDFBase64(pdfData);
      })
      .catch((err) => {
        setErr(err);
      });
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
          <PDFViewer file={pdfBase64} pageNumber={page} id={`${id}`} />
        </>
      )}
    </>
  );
}
