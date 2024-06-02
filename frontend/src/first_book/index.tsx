import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/images/logo.png";
import { faFile, faImage } from "@fortawesome/free-solid-svg-icons";
import {
  AskForBookImage,
  AskForBookPDF,
  CheckBookExist,
  CreateBook,
} from "../../wailsjs/go/main/App";
import { useState } from "react";
export default function FirstBook() {
  const [name, setName] = useState("");
  const [bookPDF, setBookPDF] = useState("");
  const [image, setImg] = useState("");
  const [err, setErr] = useState("");
  const [nameExist, setNameExist] = useState(false);
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const getBook = async () => {
    try {
      let book = await AskForBookPDF();
      setBookPDF(book);
    } catch (err) {
      setErr("Unable to get the file path");
    }
  };
  const getImg = async () => {
    try {
      let img = await AskForBookImage();
      setImg(img);
    } catch (err) {
      setErr("Unable to get the file path");
    }
  };
  return (
    <>
      <div className="pl-28">
        <div className="flex gap-16 pt-10 items-center">
          <div>
            <img src={Logo} alt="logo" width={128} />
          </div>
          <h1 className="text-[72px] font-black">The Book</h1>
        </div>
        <p className="font-medium text-[32px] mt-12">
          Welcome To The Book, add your libraries and your favorite books and
          enjoy reading :)
        </p>
        <div className="mt-10">
          <h1 className="text-[40px] font-bold ">Add your first book</h1>
          <div className="mt-5 flex flex-col gap-5">
            <input
              onChange={nameChange}
              type="text"
              className="input w-[400px]"
              placeholder="Name"
            />
            {nameExist && (
              <p className="text-red-600 font-bold">This name already exist</p>
            )}
            {!image && (
              <div
                className="file-input w-[400px] flex justify-center flex-col items-center gap-3"
                onClick={getImg}
              >
                <p className="text-light">Book picture</p>
                <div className="w-[109px] h-[109px] border-2 border-light"></div>
                <p className="text-light">667x1000</p>
              </div>
            )}
            {image && (
              <div
                onClick={getImg}
                className="cursor-pointer border-4 border-black p-3 flex items-center gap-7 max-w-[400px]"
              >
                <FontAwesomeIcon icon={faImage} className="h-[24px]" />
                <h1 className="font-bold text-xl">
                  {image.replace(/^.*[\\/]/, "")}
                </h1>
              </div>
            )}
            {bookPDF && (
              <>
                <div
                  onClick={getBook}
                  className="cursor-pointer border-4 border-black p-3 flex items-center gap-7 max-w-[400px]"
                >
                  <FontAwesomeIcon icon={faFile} className="h-[24px]" />
                  <h1 className="font-bold text-xl">
                    {bookPDF.replace(/^.*[\\/]/, "")}
                  </h1>
                </div>
              </>
            )}
            {!bookPDF && (
              <div
                className="file-input w-[400px] flex justify-center flex-col items-center gap-3"
                onClick={getBook}
              >
                <p className="text-light">PDF Book File</p>
                <FontAwesomeIcon
                  icon={faFile}
                  className="h-[92px] text-light"
                />
                <p className="text-light">book.pdf</p>
              </div>
            )}
          </div>
          <p className="text-red-600 font-semibold mt-2">{err}</p>
          <button
            className="btn mt-5 text-[28px]"
            onClick={async () => {
              if (!name || !bookPDF) {
                setErr(
                  `${name ? "" : "Name ,"} ${bookPDF ? "" : "Book File ,"} ${
                    !bookPDF && !name ? "are" : "is"
                  } required`
                );
                return;
              }
              setErr("");

              try {
                let exist = await CheckBookExist(name);
                setNameExist(exist);
                if (exist) {
                  return;
                }
                await CreateBook(name, image, bookPDF);
                location.href = "/#/home";
              } catch (err: any) {
                setErr(err);
              }
            }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
