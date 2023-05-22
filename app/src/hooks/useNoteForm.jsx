import { useReducer } from "react";
import formReducer from "../reducers/formReducer";

const initialState = {
  isLoading: false,
  error: "",
  content: "",
  title: "",
  important: true,
};
const useNoteForm = ({ note, onSubmit }) => {
  const mergedData = { ...initialState, ...note };

  const [state, dispatch] = useReducer(formReducer, mergedData);
  const { isLoading, error, ...rest } = state;

  console.log({ state });

  const onDispatchField = (e, fieldName) => {
    const { type } = e.currentTarget;

    if (type === "checkbox") {
      dispatch({
        type: "field",
        fieldName,
        payload: e.currentTarget.checked,
      });
    } else {
      dispatch({
        type: "field",
        fieldName,
        payload: e.currentTarget.value,
      });
    }
  };

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
