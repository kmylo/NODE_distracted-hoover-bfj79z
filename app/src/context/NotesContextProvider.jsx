import { useMemo } from "react";
import { NotesContext } from "./NotesContext";

export const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const notesContextValue = useMemo(
    () => ({ notes, setNotes }),
    [notes, setNotes]
  );

  return (
    <NotesContext.Provider value={notesContextValue}>
      {children}
    </NotesContext.Provider>
  );
};
