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

type BookMetaData = {
  Author: string;
  CreationDate: string;
  Creator: string;
  Title: string;
  PageCount: number;
};

type TopBarData = {
  /** The Book matadata (chapters)*/
  outline?: PDFOutline[];
  /** The url of the back button*/
  goBackUrl?: string;
  pageIndex: number;
  /**The total page number of the book */
  numPages: number;
  changePage: (n: number) => void;
  /**Page scale */
  scale: number;
  changeScale: (scale: number) => void;
  metadata?: BookMetaData;
};

interface EditablePdfViewerProps {
  /** base64 encoded PDF file */
  file: string;
  pageNumber?: number;
  scale?: number;
  onPageChange?: (numPages: number, pageIndex: number) => void;
  onPDFLoaded?: (doc: DocumentCallback) => void;
  onZoomChange?: (scale: number) => void;
}
