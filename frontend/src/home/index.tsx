import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Bar from "../components/Bar";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { database, main } from "../../wailsjs/go/models";
import { GetHomeBooks, OpenImage } from "../../wailsjs/go/main/App";
import Book from "../components/Book";
import DefaultTemplate from "../components/Templates/Default";
// TODO  a lot of work

export default function Home() {
  const [books, setBooks] = useState<main.HomeBooksData>();
  const [err, setErr] = useState<string>("");
  useEffect(() => {
    GetHomeBooks()
      .then(async (data) => {
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
        <h1 className="text-[36px] font-bold mt-3">Recently Added</h1>
        {err}
        <div className="mt-10 flex gap-10 flex-wrap">
          {books?.recentlyAdded.map((book, i) => {
            return (
              <>
                <Book
                  key={i}
                  name={book.name}
                  id={book.id}
                  progress={book.progress}
                  img={book.img}
                />
                <Book
                  key={i}
                  name={book.name}
                  id={book.id}
                  progress={book.progress}
                  img={book.img}
                />
                <Book
                  key={i}
                  name={book.name}
                  id={book.id}
                  progress={book.progress}
                  img={book.img}
                />
                <Book
                  key={i}
                  name={book.name}
                  id={book.id}
                  progress={book.progress}
                  img={book.img}
                />
                <Book
                  key={i}
                  name={book.name}
                  id={book.id}
                  progress={book.progress}
                  img={book.img}
                />
                <Book
                  key={i}
                  name={book.name}
                  id={book.id}
                  progress={book.progress}
                  img={book.img}
                />
                <Book
                  key={i}
                  name={book.name}
                  id={book.id}
                  progress={book.progress}
                  img={book.img}
                />
                <Book
                  key={i}
                  name={book.name}
                  id={book.id}
                  progress={book.progress}
                  img={book.img}
                />
              </>
            );
          })}
        </div>
      </DefaultTemplate>
    </>
  );
}
