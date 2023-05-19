import NoteForm from "../components/NoteForm";
import useNotes from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";
import { noteFormConfig } from "../utils/noteFormConfig";
import { createNote } from "../services/api";

const NoteCreate = () => {
  const { notes, handleUpdateNotes } = useNotes();
  const navigate = useNavigate();
  const handleSubmit = (formData) => {
    createNote(notes, formData, handleUpdateNotes);
    navigate("/");
  };
  const handleCancel = () => {
    navigate("/");
  };

  // console.log({ noteFormConfig });
  return (
    <div className="new-post-container">
      <div>
        <span className="text-xl uppercase">New Post</span>
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
