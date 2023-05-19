import useNoteForm from "../../hooks/useNoteForm";

const NoteForm = ({ currentNote, onSubmit, handleCancelEdit, formConfig }) => {
  const { state, onDispatchField, handleSubmit, handleUpdatePostContent } =
    useNoteForm({
      currentNote,
      onSubmit,
    });
  const { isLoading } = state;

  return (
    <>
      {/* PostForm */} {/* TODO: add some form comp with the post wrapper */}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          {formConfig.map(
            ({
              type,
              label,
              field,
              defaultValue,
              placeholder,
              minLength,
              maxLength,
              required,
            }) => (
              <div className="form-control mb-3" key={label}>
                <label className="label">
                  <span className="label-text uppercase text-xs text-sky-400/75">
                    {label}
                  </span>
                </label>
                <label className="input-group">
                  <input
                    type={type}
                    name={field}
                    defaultValue={defaultValue ?? currentNote?.[field]}
                    className="input input-bordered w-full"
                    minLength={minLength}
                    maxLength={maxLength}
                    required={required}
                    placeholder={placeholder ?? "placeholder"}
                    onChange={(e) => onDispatchField(e, field)}
                  />
                </label>
              </div>
            )
          )}
        </div>

        <div className="form-button button-container my-5">
          <button
            className="form-button btn-primary mr-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "SAVING..." : "SAVE"}
          </button>
          <button
            className="form-button btn-secondary"
            onClick={handleCancelEdit}
          >
            CANCEL
          </button>
        </div>
      </form>
    </>
  );
};

export default NoteForm;
