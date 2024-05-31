import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";

export default function usePDFMetadata(pdfBase64: string): {
  metadata: BookMetaData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
} {
  const [metadata, setMetadata] = useState<BookMetaData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  useEffect(() => {
    if (!pdfBase64) return;
    setIsLoading(true);
    setError(undefined);
    setIsError(false);
    getMetaData()
      .then((data) => {
        setMetadata(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setError(error);
      });
  }, [pdfBase64]);
  const getMetaData = async (): Promise<BookMetaData> => {
    const pdfDoc = await PDFDocument.load(pdfBase64);
    return {
      Author: pdfDoc.getAuthor() as string,
      CreationDate: pdfDoc.getCreationDate()?.toLocaleDateString() as string,
      Creator: pdfDoc.getCreator() as string,
      Title: pdfDoc.getTitle() as string,
      PageCount: pdfDoc.getPageCount(),
    };
  };
  return {
    metadata,
    isError,
    isLoading,
    error,
  };
}
