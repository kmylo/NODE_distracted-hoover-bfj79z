import React, { createContext } from "react";

// export const NotesContext = React.createContext();
export const NotesContext = React.createContext();
NotesContext.displayName = "Notes";

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = React.useState([]);

  const notesContextValue = React.useMemo(
    () => ({ notes, setNotes }),
    [notes, setNotes]
  );
  return (
    <NotesContext.Provider value={notesContextValue}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = React.useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
