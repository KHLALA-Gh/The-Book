import { useState } from "react";
import ImgInput from "../components/ImgInput";
import PDFInput from "../components/PDFInput";
import DefaultTemplate from "../components/Templates/Default";
import { CreateBook } from "../../wailsjs/go/main/App";

// TODO : Test it and remove bugs
export default function NewBook() {
  const [pdfFile, setPdfFile] = useState<string>();
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const onClickCreate = () => {
    if (!name || !pdfFile) {
      setErr("The book name and the pdf file are required");
      return;
    }
    CreateBook(name, img, pdfFile as string)
      .then((id) => {
        location.href = `/#/book/${id}`;
      })
      .catch((err) => {
        setErr(err);
      });
  };
  return (
    <>
      <DefaultTemplate>
        <div className="flex w-full h-screen justify-center items-center">
          <div className="flex flex-col gap-5">
            <h1 className="text-[42px] font-bold mb-3">Add A New Book</h1>
            <input
              className="input"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              maxLength={16}
              minLength={1}
            />
            <PDFInput
              onFileSelected={(file) => {
                setPdfFile(file);
              }}
            />
            <ImgInput
              onFileSelected={(img) => {
                setImg(img);
              }}
            />
            <p className="text-red-600 font-bold">{err}</p>
            <button
              className="btn font-bold text-[24px]"
              onClick={onClickCreate}
            >
              Create
            </button>
          </div>
        </div>
      </DefaultTemplate>
    </>
  );
}
