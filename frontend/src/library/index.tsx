import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultTemplate from "../components/Templates/Default";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import useLibrary from "../hooks/useLibrary";
import Book from "../components/Book";

export default function Library() {
  const { books } = useLibrary();
  return (
    <>
      <DefaultTemplate>
        <div>
          <h1 className="text-[64px] font-black">
            <FontAwesomeIcon icon={faBook} className="mr-7" />
            Your Library
          </h1>
          <p className="text-light text-[22px]">
            Find all your added books here.
          </p>
          <div className="mt-20 flex flex-wrap gap-7">
            {books.map((book, i) => {
              return <Book key={i} {...book} img={book.img} />;
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
