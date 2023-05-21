import { useNavigate } from "react-router-dom";

import FetchStatesWrapper from "../../components/FetchStatesWrapper/FetchStatesWrapper";

import useNotes from "../../hooks/useNotes";
import { deleteNote } from "../../services/api";
import { baseNoteRoute } from "../../utils/constants";

const Home = () => {
  const { error, isLoaded, notes } = useNotes();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <span>HOME</span>
        <div className="flex row">
          <div>Notes List</div>
          <button
            className="ml-auto"
            onClick={() => navigate(`${baseNoteRoute}/new`)}
          >
            New Note
          </button>
        </div>
        {/* TODO: check if suspense */}
        <FetchStatesWrapper {...{ error, isLoaded, items: notes }}>
          {/* {JSON.stringify(notes, null, 2)} */}
          <ListItems {...{ items: notes }} />
        </FetchStatesWrapper>
        {/* <pre>
          NOTES:
          <code>{JSON.stringify(notes, null, 2)}</code>
        </pre> */}
      </div>
    </>
  );
};

export default Home;

const ListItems = ({ items }) => {
  const { notes, handleUpdateNotes } = useNotes();
  const handleClick = ({ noteId }) => {
    deleteNote({ noteId }).then(() => {
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      handleUpdateNotes(updatedNotes);
    });
  };
  if (!items) return null;
  return (
    <div className="item-list">
      {items?.map((item, idx) => {
        return (
          <div className="item-container" key={item.id}>
            <div className="item-header">{idx} </div>
            <div className="item-body">
              <div className="content">{item.content}</div>
            </div>
            <div className="item-footer mt-auto flex row">
              <button>EDIT</button>
              <button onClick={() => handleClick({ noteId: item.id })}>
                DELETE
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
