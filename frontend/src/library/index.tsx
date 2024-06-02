import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultTemplate from "../components/Templates/Default";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import useLibrary from "../hooks/useLibrary";
import Book from "../components/Book";
import { useState } from "react";

export default function Library() {
  const { books } = useLibrary();
  const [search, setSearch] = useState("");
  return (
    <>
      <DefaultTemplate>
        <div>
          <h1 className="text-[64px] font-black">
            <FontAwesomeIcon icon={faBook} className="mr-7" />
            Your Library
          </h1>
          <h1 className="text-light text-[22px]">
            Find all your added books here.
          </h1>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="search-inp mt-3"
            placeholder="Search"
          />
          <div className="mt-20 flex flex-wrap gap-7">
            {books.map((book, i) => {
              if (!search) {
                return <Book key={i} {...book} />;
              }
              if (
                book.name
                  .toLowerCase()
                  .split(" ")
                  .join("")
                  .startsWith(search.split(" ").join("").toLowerCase())
              ) {
                return <Book key={i} {...book} />;
              }
            })}
          </div>
        </div>
        {!books.length && (
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
