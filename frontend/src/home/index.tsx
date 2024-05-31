import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { main } from "../../wailsjs/go/models";
import { GetHomeBooks } from "../../wailsjs/go/main/App";
import Book from "../components/Book";
import DefaultTemplate from "../components/Templates/Default";

export default function Home() {
  const [books, setBooks] = useState<main.HomeBooksData>();
  const [err, setErr] = useState<string>("");
  useEffect(() => {
    GetHomeBooks()
      .then(async (data) => {
        for (let i = 0; i < data.lastReaded.length; i++) {
          data.recentlyAdded = data.recentlyAdded.filter((book) => {
            if (book.id === data.lastReaded[i].id) return false;
            return true;
          });
        }
        setBooks(data);
      })
      .catch((err) => {
        setErr(err);
      });
  }, []);
  return (
    <>
      <DefaultTemplate>
        <h1 className="text-[64px] font-black">
          <FontAwesomeIcon icon={faHouse} className="mr-10" />
          Your Home
        </h1>
        {err}
        {books?.lastReaded.length != 0 && (
          <>
            <h1 className="text-[36px] font-bold mt-3">Last Readed</h1>
            <div className="mt-10 flex gap-10 flex-wrap">
              {books?.lastReaded.map((book, i) => {
                return (
                  <>
                    <Book key={i} {...book} />
                  </>
                );
              })}
            </div>
          </>
        )}
        {books?.recentlyAdded.length != 0 && (
          <>
            <h1 className="text-[36px] font-bold mt-3">Recently Added</h1>

            <div className="mt-10 flex gap-10 flex-wrap">
              {books?.recentlyAdded.map((book, i) => {
                return (
                  <>
                    <Book key={i} {...book} />
                  </>
                );
              })}
            </div>
          </>
        )}

        {books?.favoriteBooks.length != 0 && (
          <>
            <h1 className="text-[36px] font-bold mt-10">Your Favorite Books</h1>
            <div className="mt-10 flex gap-10 flex-wrap">
              {books?.favoriteBooks.map((book, i) => {
                return (
                  <>
                    <Book key={i} {...book} />
                  </>
                );
              })}
            </div>
          </>
        )}
        {!(
          books?.favoriteBooks.length ||
          books?.lastReaded.length ||
          books?.recentlyAdded.length
        ) && (
          <div className="flex w-full mt-10">
            <div>
              <h1 className="text-[32px] font-bold mb-6">
                You don't have any book
              </h1>
              <a className="btn p-5 font-bold text-[20px] " href="/#/new_book">
                Create One
              </a>
            </div>
          </div>
        )}
      </DefaultTemplate>
    </>
  );
}
