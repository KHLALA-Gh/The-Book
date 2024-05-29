import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetBook,
  GetBookPDFData,
  SetBookFavorite,
} from "../../wailsjs/go/main/App";
import { database } from "../../wailsjs/go/models";
import useImg from "../hooks/useImage";
import DefaultTemplate from "../components/Templates/Default";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import usePDFMetadata from "../hooks/usePDFMetadata";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

export default function Book() {
  const { id } = useParams();
  const [book, setBook] = useState<database.Book>();
  const [op, setOp] = useState<boolean>();
  const [pdfBase64, setPDFbase64] = useState<string>("");
  const { metadata, isError, isLoading } = usePDFMetadata(pdfBase64);
  const { imgData } = useImg(book?.img || "");
  const [err, setErr] = useState<string>("");
  useEffect(() => {
    if (Number.isInteger(id)) {
      setErr("Not A Valid ID " + id);
      return;
    }
    GetBook(+(id as string)).then((book) => {
      setBook(book);
    });
  }, []);
  useEffect(() => {
    if (Number.isInteger(id)) {
      setErr("Not A Valid ID " + id);
      return;
    }
    GetBookPDFData(+(id as string)).then((data) => {
      setPDFbase64(data);
    });
  }, []);
  const clickFavorite = async () => {
    try {
      await SetBookFavorite(+(id as string), !book?.favorite);
      setBook({
        ...(book as database.Book),
        favorite: !book?.favorite,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <DefaultTemplate>
        {err && (
          <div className="flex justify-center items-center">
            <h1 className="text-[64px] text-red-600">{err}</h1>
          </div>
        )}
        {!err && (
          <>
            <div className="flex gap-20">
              <div>
                <img src={imgData} alt="wawa" width={226} />
              </div>
              <div>
                <h1 className="text-[32px] font-bold relative">
                  {book?.name}{" "}
                  <FontAwesomeIcon
                    icon={book?.favorite ? solidStar : faStar}
                    className={"mr-6 " + (!book?.favorite || "text-yellow-500")}
                    onClick={clickFavorite}
                  />
                  <FontAwesomeIcon
                    onClick={() => {
                      setOp(!op);
                    }}
                    className="ml-2 cursor-pointer"
                    icon={faEllipsisVertical}
                  />
                  {op && (
                    <div className="rounded-md border-2 border-black text-[20px] absolute bottom-0 right-0 translate-y-[100%] translate-x-[100%] bg-white flex-col">
                      <div className="pt-1 pb-1 pr-5 pl-5 bg-red-600 text-white cursor-pointer">
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />{" "}
                        delete
                      </div>
                      <div className="border-t-2 border-black pt-1 pb-1 pr-5 pl-5 cursor-pointer">
                        <FontAwesomeIcon icon={faPencil} className="mr-2" />{" "}
                        Edit
                      </div>
                    </div>
                  )}
                </h1>
                <h1 className="text-[24px]">
                  Progress :{" "}
                  <span className="font-bold">
                    {Math.round(book?.progress as number)}
                  </span>
                  %
                </h1>
                <button
                  className="btn text-[22px] mt-4"
                  onClick={() => {
                    location.href = `/#/book/${id}/read`;
                  }}
                >
                  Read
                </button>
              </div>
            </div>
            {metadata && !isLoading && (
              <div className="mt-5 text-[24px]">
                <h1 className="">
                  Title : <span className="font-bold">{metadata?.Title}</span>
                </h1>
                <h1 className="">
                  Author : <span className="font-bold">{metadata?.Author}</span>
                </h1>{" "}
                <h1 className="">
                  Creator :{" "}
                  <span className="font-bold">{metadata?.Creator}</span>
                </h1>{" "}
                <h1 className="">
                  Creation Date :{" "}
                  <span className="font-bold">{metadata?.CreationDate}</span>
                </h1>{" "}
                <h1 className="">
                  Pages :{" "}
                  <span className="font-bold">{metadata?.PageCount}</span>
                </h1>
              </div>
            )}
            {isError && (
              <div>
                <h1 className="text-[24px] text-red-600">
                  Cannot get meta data
                </h1>
              </div>
            )}
            {isLoading && (
              <div className="mt-5">
                <h1 className="text-[24px]">Loading meta data</h1>
              </div>
            )}
          </>
        )}
      </DefaultTemplate>
    </>
  );
}
