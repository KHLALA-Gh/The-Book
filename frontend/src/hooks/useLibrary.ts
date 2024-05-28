import { useEffect, useState } from "react";
import { GetLibrary } from "../../wailsjs/go/main/App";
import { database } from "../../wailsjs/go/models";

interface UseLibraryHook {
  books: database.Book[];
  isLoading: boolean;
  isError: boolean;
  error: string;
}

export default function useLibrary(): UseLibraryHook {
  const [books, setBooks] = useState<database.Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setIsLoading(true);
    getLib()
      .then((books) => {
        setBooks(books);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      });
  }, []);
  const getLib = async (): Promise<database.Book[]> => {
    let books = await GetLibrary();
    return books;
  };
  return {
    books,
    isError,
    isLoading,
    error,
  };
}
