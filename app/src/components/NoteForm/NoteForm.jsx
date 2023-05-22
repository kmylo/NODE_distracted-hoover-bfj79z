import useNoteForm from "../../hooks/useNoteForm";

const NoteForm = ({ currentNote, onSubmit, handleCancelEdit, formConfig }) => {
  // console.log({ currentNote, onSubmit, handleCancelEdit, formConfig });
  const { state, onDispatchField, handleSubmit } = useNoteForm({
    currentNote,
    onSubmit,
  });
  const { isLoading } = state;
  // console.log({ state });

  const renderFormElement = (elementConfig) => {
    const {
      elementType,
      id,
      label,
      type = "text",
      field,
      value,
      checked,
      defaultValue,
      placeholder = "placeholder",
      minLength,
      maxLength,
      required,
      options,
      rows,
    } = elementConfig;

    // type==="checkbox" ? checked=checked:

    const formElementComponents = {
      input: (
        <input
          // {...{
          // }}
          id={id}
          type={type}
          name={field}
          label={label}
          value={value}
          checked={checked}
          defaultValue={defaultValue ?? currentNote?.[field]}
          className="input input-bordered w-full"
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          placeholder={placeholder ?? "placeholder"}
          onChange={(e) => onDispatchField(e, field)}
        />
      ),
      textarea: (
        <textarea
          name={field}
          defaultValue={defaultValue ?? currentNote?.[field]}
          className="input input-bordered w-full"
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          rows={rows}
          placeholder={placeholder ?? "placeholder"}
          onChange={(e) => onDispatchField(e, field)}
        />
      ),
      select: (
        <select
          name={field}
          defaultValue={defaultValue ?? currentNote?.[field]}
          className="input input-bordered w-full resize-none"
          required={required}
          onChange={(e) => onDispatchField(e, field)}
        >
          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ),
      // Add additional form element components here
    };

    return formElementComponents[elementType] || null;
  };

  return (
    <>
      {/* NotesForm */} {/* TODO: add some form comp with the wrapper */}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="txt-left">
          {formConfig.map((group) => (
            <div className="form-group" key={group.label}>
              <div className="form-group-label">
                <span className="label-text uppercase text-xs text-sky-400/75">
                  {group.label}
                </span>
              </div>
              <div className="form-group-inputs">
                {group.fields.map((elementConfig) => (
                  <div className="form-control mb-5" key={elementConfig.field}>
                    {renderFormElement(elementConfig)}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
