export function formReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "success": {
      return {
        ...state,
        isSaving: true,
        isLoading: false,
      };
    }
    case "error": {
      return {
        ...state,
        error: "Msg error!",
        isSaving: false,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default formReducer;
