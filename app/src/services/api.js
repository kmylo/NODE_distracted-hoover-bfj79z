import { mockedNotes } from "../utils/mock_data";
import { API_URL_DOMAIN } from "./settings";

export const createNote = (initialState, newNote, handler) => {
  newNote.createdAt = new Date();
  const newState = [...initialState, newNote];
  handler(newState);
};
export const getFakeNotes = async () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(mockedNotes);
    }, 200)
  );
export const getNotes = async () =>
  fetch(`${API_URL_DOMAIN}/notes`)
    .then((res) => res.json())
    .then((data) => data);
