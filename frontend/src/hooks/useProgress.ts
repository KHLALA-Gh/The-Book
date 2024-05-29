import { useEffect, useState } from "react";
import { GetBookProgress } from "../../wailsjs/go/main/App";

interface UseProgressHook {
  progress: number;
  isError: boolean;
  isLoading: boolean;
  error: string;
}
/**
 * Get Book Progress
 */
export default function useProgress(id: number): UseProgressHook {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (!Number.isInteger(id)) {
      setIsError(true);
      setIsLoading(false);
      setError("Invalid id : " + id);
      return;
    }
    setIsLoading(true);
    setIsError(false);
    getProgress(id)
      .then((prog) => {
        setProgress(prog);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setError(err);
        setIsError(true);
        setIsLoading(false);
      });
  }, [id]);
  const getProgress = async (id: number): Promise<number> => {
    let prog = await GetBookProgress(id);
    return prog;
  };
  return {
    progress,
    isError,
    isLoading,
    error,
  };
}
