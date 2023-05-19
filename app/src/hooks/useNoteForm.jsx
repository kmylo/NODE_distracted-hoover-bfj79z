import { useReducer } from "react";
import formReducer from "../reducers/formReducer";

const initialState = {
  isLoading: false,
  error: "",
  id: "",
  slug: "",
  title: "",
  author: "",
  content: "",
  createdAt: "",
};
const usePostForm = ({ post, onSubmit }) => {
  const mergedData = { ...initialState, ...post };

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
  const handleUpdatePostContent = (value) => {
    dispatch({
      type: "field",
      fieldName: "content",
      payload: value,
    });
  };

  return { state, onDispatchField, handleSubmit, handleUpdatePostContent };
};

export default usePostForm;
