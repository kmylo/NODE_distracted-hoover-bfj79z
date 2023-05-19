import { useNavigate } from "react-router-dom";
import useNotes from "../../hooks/useNotes";
import { baseNoteRoute } from "../../utils/constants";

const Home = () => {
  const { notes } = useNotes();
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
          </button>{" "}
        </div>
        <ListItems {...{ items: notes }} />
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
  if (!items) return null;
  return (
    <div className="item-list">
      {items.map((item, idx) => {
        return (
          <div className="item-container" key={item.id}>
            <div className="item-header">{idx} </div>
            <div className="item-body">
              <div className="content">{item.content}</div>
            </div>
            <div className="item-footer mt-auto flex row">
              <button>EDIT</button>
              <button>DELETE</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
