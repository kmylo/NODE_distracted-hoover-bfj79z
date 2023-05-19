const express = require("express");
const Note = require("./models/Note");
require("./mongo");
console.log("Hello CodeSandbox");

const randomId = () => Math.floor(Math.random() * Date.now()).toString(16);

let notes = [
  {
    id: "6462f0ccdd544f80b192ac52",
    content: "This is my 01 note helloworld",
    date: "2023-05-16T02:56:12.564Z",
    important: false,
  },
  {
    id: "6462f0e0321e3750bcaf2efb",
    content: "This is my 02 note helloworld",
    date: "2023-05-16T02:56:32.954Z",
    important: true,
  },
  {
    id: "6462f0fc4300bb065e41c931",
    content: "This is my 03 note helloworld",
    date: "2023-05-16T02:57:00.974Z",
    important: true,
  },
  {
    id: "6462f11b3ec049c748ef4324",
    content: "This is my 04 note helloworld",
    date: "2023-05-16T02:57:31.575Z",
    important: true,
  },
];

// Create Express app
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
// app.use(express.static("../app/dist"));

// Define a sample route
app.get("/", (req, res) => {
  // console.log({ req });
  res.send("<h1>Hello, Docker with Node.js and MongoDB!!!</h1>");
});

// GET ALL FAKE NOTES
app.get("/fakeapi/notes", (req, res) => {
  res.json(notes);
});
// GET ALL NOTES
app.get("/api/notes", (req, res) => {
  Note.find({}).then((_notes) => {
    res.json(_notes);
  });
});

// GET ONE NOTE
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  console.log({ id, note });
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
// DELETE ONE NOTE
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

// create  note
app.post("/api/notes", (req, res) => {
  const note = req.body;
  console.log({ note });
  if (!note || !note.content) {
    return res.status(400).json({
      error: "note.content is missing",
      x,
    });
  }
  // const ids = notes.map((note) => note.id);
  // const maxId = Math.max(...ids);
  // const id = maxId + 1;
  const id = randomId();

  const content = note?.content;
  const important = note?.important ?? false;
  const date = new Date().toISOString();

  const newNote = {
    id,
    content,
    important,
    date,
  };
  notes = [...notes, newNote];
  res.json(newNote);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
