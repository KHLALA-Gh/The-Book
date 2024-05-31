type FileInputEventsCallBacks = {
  onFileSelected?: (fileName: string) => void;
  onFileRemoved?: (fileName: string) => void;
  onError?: (err: unknown) => void;
  onSelecting?: () => void;
};
type FileInputProps = {
  title?: string;
};

type InputProps = {
  value?: string;
};

type PDFInput = InputProps & FileInputEventsCallBacks & FileInputProps;
type ImgInput = InputProps & FileInputEventsCallBacks & FileInputProps;
