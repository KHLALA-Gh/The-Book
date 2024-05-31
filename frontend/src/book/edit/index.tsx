import { useParams } from "react-router-dom";
import DefaultTemplate from "../../components/Templates/Default";
import { useEffect, useState } from "react";
import PDFInput from "../../components/PDFInput";
import ImgInput from "../../components/ImgInput";
import useBook from "../../hooks/useBook";
import { UpdateBook } from "../../../wailsjs/go/main/App";
import Book from "../../components/Book";

export default function EditBook() {
  const { id } = useParams();
  const { book, isError, error } = useBook(+(id as string));
  const [name, setName] = useState(book?.name || "");
  const [fileName, setFileName] = useState("");
  const [imgName, setImgName] = useState(book?.img || "");
  const updateBook = async () => {
    UpdateBook(+(id as string), name, fileName, imgName)
      .then(() => {
        location.href = `/#/book/${id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setName(book?.name as string);
    setImgName(book?.img as string);
  }, [book]);
  return (
    <>
      <DefaultTemplate>
        <div className="flex w-full h-full justify-center items-center gap-24">
          <div>
            <h1 className="text-[32px] font-bold mb-5">Edit The Book</h1>
            <div className="flex flex-col gap-5">
              <div>
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <PDFInput
                  title="Change PDF file"
                  value={fileName}
                  onFileSelected={(name) => {
                    setFileName(name);
                  }}
                />
              </div>
              <div>
                <ImgInput
                  title="Change book image"
                  value={""}
                  onFileSelected={(name) => {
                    setImgName(name);
                  }}
                />
              </div>
            </div>
            <button
              onClick={updateBook}
              className="mt-5 btn text-[24px] font-bold"
            >
              Edit
            </button>
          </div>
          <div>
            <Book {...book} img={imgName} />
          </div>
        </div>
        {isError && <p className="text-red-600 text-[20px]">{error}</p>}
      </DefaultTemplate>
    </>
  );
}
