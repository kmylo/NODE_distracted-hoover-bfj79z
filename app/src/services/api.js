import { mockedNotes } from "../utils/mock_data";
import client, { get, post } from "./client";
import { API_URL_DOMAIN } from "./settings";

const notesURLEndpoint = `${API_URL_DOMAIN}/notes`;

export const createNoteOld = (initialState, newNote, handler) => {
  newNote.createdAt = new Date();
  const newState = [...initialState, newNote];
  handler(newState);
};
export const createNote2 = async (initialState, newNote, handler) => {
  // newNote.createdAt = new Date();

  try {
    const response = await client(API_URL_DOMAIN, "notes", {
      method: "POST",
      body: newNote,
    });

    const newState = [...initialState, response];
    handler(newState);
  } catch (error) {
    console.error("Error creating note:", error);
    // Handle the error, e.g., show an error message
  }
};
export const getFakeNotes = async () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(mockedNotes);
    }, 200)
  );
// export const oldGetNotes = async () =>
//   fetch(notesURLEndpoint)
//     .then((res) => res.json())
//     .then((data) => data);

export const getNotes = async () =>
  get({ api_domain: API_URL_DOMAIN, endpoint: "notes" });

export const createNote3 = async ({ newNote }) =>
  post({
    api_domain: API_URL_DOMAIN,
    endpoint: "notes",
    body: newNote,
    // customConfig,
  });

export const createNote4 = (note) => {
  const endpoint = "/notes";
  const body = {
    note,
  };
  client(endpoint, body, {
    method: "POST",
  }).then((response) => {
    if (response.ok) {
      console.log({ response });
      return response.json();
    } else {
      console.log(response.error);
    }
  });
};

export const createNote = ({ newNote }) => {
  // return fetch("https://jsonplaceholder.typicode.com/posts", {
  const body = {
    // content: "note de prueba",
    // important: false,
    ...newNote,
  };
  console.log({ API_URL_DOMAIN, notesURLEndpoint });
  return fetch("https://i5msdw-3001.csb.app/api/notes", {
    // return fetch("https://localhost:3001/api/notes", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      // "Content-type": "application/json; charset=UTF-8",
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch(console.error);
};

export const deleteNote = ({ noteId }) => {
  console.log({ noteId });
  const URL = `https://i5msdw-3001.csb.app/api/notes/${noteId}`;
  const params = {
    method: "DELETE",
  };
  return fetch(URL, params)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch(console.error);
};
