import { useReducer } from "react";
import formReducer from "../reducers/formReducer";

const initialState = {
  isLoading: false,
  error: "",
  // id: "",
  // slug: "",
  // title: "",
  // author: "",
  content: "",
  // important: false,
  // createdAt: "",
};
const useNoteForm = ({ note, onSubmit }) => {
  const mergedData = { ...initialState, ...note };

  const [state, dispatch] = useReducer(formReducer, mergedData);
  const { isLoading, error, ...rest } = state;

  const onDispatchField = (e, fieldName) =>
    dispatch({
      type: "field",
      fieldName,
      payload: e.currentTarget.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(rest);
  };
  const handleUpdateNoteContent = (value) => {
    dispatch({
      type: "field",
      fieldName: "content",
      payload: value,
    });
  };

  return { state, onDispatchField, handleSubmit, handleUpdateNoteContent };
};

export default useNoteForm;
