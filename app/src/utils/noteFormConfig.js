export const oldNoteFormConfig = [
  {
    type: "text",
    label: "title",
    field: "title",
    placeholder: "Enter title",
    minLength: 2,
    required: true,
  },
  {
    type: "checkbox",
    label: "important",
    field: "important",
    placeholder: "important",
  },
];

export const noteFormConfig = [
  {
    label: "Title",
    fields: [
      {
        elementType: "input",
        type: "text",
        label: "title",
        field: "title",
        placeholder: "Enter title",
        // ...other options
      },
    ],
  },
  {
    label: "Content",
    fields: [
      {
        elementType: "textarea",
        label: "content",
        field: "content",
        placeholder: "Enter Content",
        minLength: 2,
        required: true,
        rows: 4,
        // ...other options
      },
    ],
  },
  {
    label: "Important",
    fields: [
      {
        elementType: "input",
        type: "checkbox",
        label: "important",
        field: "important",
        defaultValue: false,
        // ...other options
      },
    ],
  },
];

export const templateFormConfig = [
  {
    label: "Group 1",
    fields: [
      {
        elementType: "input",
        label: "Title",
        field: "title",
        // ...other options
      },
      {
        elementType: "textarea",
        label: "Description",
        field: "description",
        rows: 4,
        // ...other options
      },
    ],
  },
  {
    label: "Group 2",
    fields: [
      {
        elementType: "select",
        label: "Category",
        field: "category",
        options: [
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          // ...other options
        ],
        // ...other options
      },
      // Add additional fields here
    ],
  },
];
