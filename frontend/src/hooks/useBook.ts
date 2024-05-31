import { useEffect, useState } from "react";
import { database } from "../../wailsjs/go/models";
import { GetBook } from "../../wailsjs/go/main/App";

interface UseBookReturnData {
  book: database.Book | undefined;
  isError: boolean;
  isLoading: boolean;
  error: string;
}

export default function useBook(id: number): UseBookReturnData {
  const [book, setBook] = useState<database.Book>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!Number.isInteger(id)) {
      return;
    }
    setIsloading(true);
    setIsError(false);
    getBook(id)
      .then((data) => {
        setBook(data);
        setIsloading(false);
        setIsError(false);
      })
      .catch((err) => {
        setError(err);
        setIsError(true);
        setIsloading(false);
      });
  }, [id]);
  const getBook = async (id: number): Promise<database.Book> => {
    return await GetBook(id);
  };
  return {
    book,
    error,
    isLoading,
    isError,
  };
}
