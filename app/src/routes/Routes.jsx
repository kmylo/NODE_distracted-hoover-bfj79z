import { lazy } from "react";

import { baseNoteRoute } from "../utils/constants";

// import NoteEdit from "../pages/PostEdit";
import NoteCreate from "../pages/NoteCreate";
// import NotFound from "../pages/NotFound";
// import SingleNote from "../pages/SinglePost";

const HomePage = lazy(() => import("../pages/Home"));
// const NotesListPage = lazy(() => import("../pages/NotesListPage"));

const NotFound = () => <div>NOT FOUND</div>;

export const APP_ROUTES = [
  {
    element: <HomePage />,
    path: "/",
    title: "Home",
  },
  //   {
  //     element: <NotesListPage />,
  //     path: "/notes-list",
  //     title: "Notes",
  //   },
  {
    element: <NoteCreate />,
    path: `${baseNoteRoute}/new`,
  },
  //   {
  //     element: <SingleNote />,
  //     path: `${baseNoteRoute}:noteParam`,
  //   },
  //   {
  //     element: <NoteEdit />,
  //     path: `${baseNoteRoute}:noteParam/edit`,
  //   },

  {
    element: <NotFound />,
    path: "*",
  },
];
