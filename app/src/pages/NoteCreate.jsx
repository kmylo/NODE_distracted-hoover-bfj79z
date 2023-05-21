import NoteForm from "../components/NoteForm";
import useNotes from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";
import { noteFormConfig } from "../utils/noteFormConfig";
import { createNote } from "../services/api";

const NoteCreate = () => {
  const { notes, handleUpdateNotes } = useNotes();
  const navigate = useNavigate();
  const handleSubmit = (formData) => {
    console.log({ formData });

    createNote({ newNote: formData })
      .then((res) => {
        const data = [...notes, res];
        // const data = [...notes, formData];
        handleUpdateNotes(data);
        navigate("/");
      })
      .catch(console.error);
  };
  const handleCancel = () => {
    navigate("/");
  };

  // console.log({ noteFormConfig });
  return (
    <div className="new-note-container">
      <div>
        <span className="text-xl uppercase">New Note!!</span>
      </div>
      <NoteForm
        onSubmit={handleSubmit}
        handleCancelEdit={handleCancel}
        formConfig={noteFormConfig}
      />
    </div>
  );
};

export default NoteCreate;
