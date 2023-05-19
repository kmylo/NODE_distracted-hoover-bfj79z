import { useEffect, useState } from "react";
import { useNotesContext } from "../context/NotesContext";

import { getNotes } from "../services/api";

const useNotes = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { notes, setNotes } = useNotesContext();

  const handleUpdateNotes = (data) => {
    setNotes(data);
  };

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const fetchData = async () => {
      if (notes?.length > 0) return;
      try {
        // const data = await getNotes(abortController.signal);
        const data = await getNotes();
        if (isMounted) {
          setIsLoaded(true);
          setNotes(data);
        }
      } catch (e) {
        console.log(e);
        if (isMounted) {
          setIsLoaded(true);
          setError(e);
        }
      } finally {
        if (isMounted) {
          setIsLoaded(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [notes.length, setNotes]);

  return { isLoaded, error, notes, handleUpdateNotes };
  // return { notes };
};

export default useNotes;
