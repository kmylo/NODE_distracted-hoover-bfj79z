import NoteForm from "../components/NoteForm";
import useNotes from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";
import { noteFormConfig } from "../utils/noteFormConfig";
// import { createPost } from "../services/api";

const NoteCreate = () => {
  const { notes, handleUpdateNotes } = useNotes();
  // const navigate = useNavigate();
  const handleSubmit = (formData) => {
    // createPost(notes, formData, handleUpdateNotes);
    // navigate("/note");
  };
  const handleCancel = () => {
    // navigate("/note");
  };

  console.log({ noteFormConfig });
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
