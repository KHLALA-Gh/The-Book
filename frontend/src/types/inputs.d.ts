type FileInputEventsCallBacks = {
  onFileSelected?: (fileName: string) => void;
  onFileRemoved?: (fileName: string) => void;
  onError?: (err: unknown) => void;
  onSelecting?: () => void;
};

type InputProps = {
  value?: string;
};

type PDFInput = InputProps & FileInputEventsCallBacks;
type ImgInput = InputProps & FileInputEventsCallBacks;
