import { useState } from "react";
import { AskForBookPDF } from "../../../wailsjs/go/main/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export default function PDFInput({
  value,
  onFileSelected,
  onError,
  onSelecting,
}: PDFInput) {
  const [bookPDF, setBookPDF] = useState(value);

  const getBook = async () => {
    try {
      if (onSelecting) {
        onSelecting();
      }
      let book = await AskForBookPDF();
      setBookPDF(book);
      if (onFileSelected) {
        onFileSelected(book);
      }
    } catch (err) {
      if (!onError) return;
      onError(err);
    }
  };
  return (
    <>
      {!bookPDF && (
        <div>
          <div
            className="file-input w-[400px] flex justify-center flex-col items-center gap-3"
            onClick={getBook}
          >
            <p className="text-light">PDF Book File</p>
            <FontAwesomeIcon icon={faFile} className="h-[92px] text-light" />
            <p className="text-light">book.pdf</p>
          </div>
        </div>
      )}
      {bookPDF && (
        <>
          <div
            onClick={getBook}
            className="cursor-pointer border-4 border-black p-3 flex items-center gap-7 w-[400px]"
          >
            <FontAwesomeIcon icon={faFile} className="h-[24px]" />
            <h1 className="font-bold text-xl">{bookPDF.split("/").at(-1)}</h1>
          </div>
        </>
      )}
    </>
  );
}
