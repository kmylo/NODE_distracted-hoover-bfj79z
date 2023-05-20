require("dotenv").config();
require("./mongo");

const express = require("express");

// Create Express app
const app = express();
const cors = require("cors");

const Note = require("./models/Note");

const notFound = require("./middleware/notFound.js");
const handleErrors = require("./middleware/handleErrors.js");

console.log("Hello CodeSandbox");

const randomId = () => Math.floor(Math.random() * Date.now()).toString(16);

let notes = [
  {
    id: "6462f0ccdd544f80b192ac52",
    content: "01 note",
    date: "2023-05-16T02:56:12.564Z",
    important: false,
  },
  {
    id: "6462f0e0321e3750bcaf2efb",
    content: "02 note",
    date: "2023-05-16T02:56:32.954Z",
    important: true,
  },
  {
    id: "6462f0fc4300bb065e41c931",
    content: "03 note",
    date: "2023-05-16T02:57:00.974Z",
    important: true,
  },
  {
    id: "6462f11b3ec049c748ef4324",
    content: "04 note",
    date: "2023-05-16T02:57:31.575Z",
    important: true,
  },
];

app.use(cors());
app.use(express.json());
// app.use(express.static("../app/dist"));

// TODO: create server routes and move to notes route

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
app.get("/api/notes", async (req, res) => {
  const _notes = await Note.find({});
  res.json(_notes);
});

// GET ONE NOTE
app.get("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;

  Note.findById(id)
    .then((note) => {
      if (note) return res.json(note);
      res.status(404).end();
    })
    .catch((err) => {
      console.log({ err });
      next(err);
    });
});
// DELETE ONE NOTE
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Note.findByIdAndDelete(id);
  if (data === null) return res.sendStatus(404);

  res.status(204).end();
});

// CREATE ONE NOTE
app.post("/api/notes", async (req, res, next) => {
  const { content, important = false } = req.body;

  if (!content) {
    return res.status(400).json({
      error: 'required "content" field is missing',
    });
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
  });

  newNote
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((err) => next(err));
});

// UPDATE ONE NOTE
app.put("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;
  const { content, important } = req.body;

  const newNoteInfo = {
    content,
    important,
  };

  // console.log(id, newNoteInfo);

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((result) => {
      // console.log(result);
      res.json(result);
    })
    .catch(next);
});

app.use(notFound);
app.use(handleErrors);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
